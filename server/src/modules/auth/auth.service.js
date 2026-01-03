import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { env } from "../../config/env.config.js";
import { ApiError } from "../../utils/ApiError.js";

/* ---------- Register User ---------- */
export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user", // default role
  });

  // Do not return password
  const userSafe = user.toObject();
  delete userSafe.password;

  return userSafe;
};

/* ---------- Login User ---------- */
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const accessToken = jwt.sign({ id: user._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ id: user._id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });

  // Remove password from response
  const userSafe = user.toObject();
  delete userSafe.password;

  return { accessToken, refreshToken, user: userSafe };
};

/* ---------- Refresh JWT Token ---------- */
export const refreshToken = async (token) => {
  if (!token) throw new ApiError(401, "Refresh token required");

  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new ApiError(401, "User not found");

    const accessToken = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    // Optionally issue new refresh token
    const newRefreshToken = jwt.sign({ id: user._id }, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }
};

/* ---------- Logout User ---------- */
export const logout = async (userId) => {
  // In stateless JWT, logout is handled on client by clearing refresh token
  // Optionally, you can implement token blacklisting here
  return true;
};
