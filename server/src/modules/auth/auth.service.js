import User from "../user/user.model.js"
import { RefreshToken } from "../user/refreshToken.model.js";
import { hashValue, compareHash } from "../../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";

export const registerUser = async (email, password) => {
  const passwordHash = await hashValue(password);
  return User.create({ email, passwordHash });
};

export const loginUser = async (email, password, meta) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await compareHash(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const refreshToken = generateRefreshToken();
  const refreshTokenHash = await hashValue(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    tokenHash: refreshTokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ...meta,
  });

  return {
    user,
    accessToken: generateAccessToken(user),
    refreshToken,
  };
};
