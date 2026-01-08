import { RefreshToken } from "../user/refreshToken.model.js";
import { compareHash, hashValue } from "../../utils/hash.js";
import { setRefreshCookie } from "../../utils/cookie.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";
import { registerUser, loginUser } from "../auth/auth.service.js";

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      console.warn("[REGISTER] Missing required fields", {
        name,
        email,
      });
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("[REGISTER] Email already exists", { email });
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // 3️⃣ Hash password
    const passwordHash = await hashValue(password);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    console.info("[REGISTER] User registered successfully", {
      userId: user._id,
    });

    return res.status(201).json({ id: user._id });
  } catch (error) {
    console.error("[REGISTER] Failed", {
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};



/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      console.warn("[LOGIN] Missing credentials", { email });
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password,
      {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      }
    );

    setRefreshCookie(res, refreshToken);

    console.info("[LOGIN] Success", {
      userId: user._id,
      ip: req.ip,
    });

    return res.json({ accessToken });
  } catch (error) {
    console.error("[LOGIN] Failed", {
      email: req.body?.email,
      error: error.message,
    });

    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
};

/**
 * REFRESH TOKEN
 */
export const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      console.warn("[REFRESH] No refresh token cookie");
      return res.sendStatus(401);
    }

    // ⚠️ SECURITY FIX: do NOT pick any token blindly
    const activeTokens = await RefreshToken.find({ revokedAt: null });

    let storedToken = null;
    for (const t of activeTokens) {
      if (await compareHash(token, t.tokenHash)) {
        storedToken = t;
        break;
      }
    }

    if (!storedToken) {
      console.warn("[REFRESH] Invalid or reused refresh token");
      return res.sendStatus(401);
    }

    // Rotate token
    storedToken.revokedAt = new Date();

    const newRefreshToken = generateRefreshToken();
    storedToken.replacedByToken = await hashValue(newRefreshToken);
    await storedToken.save();

    await RefreshToken.create({
      userId: storedToken.userId,
      tokenHash: await hashValue(newRefreshToken),
      expiresAt: storedToken.expiresAt,
    });

    setRefreshCookie(res, newRefreshToken);

    console.info("[REFRESH] Token rotated", {
      userId: storedToken.userId,
    });

    return res.json({
      accessToken: generateAccessToken({ _id: storedToken.userId }),
    });
  } catch (error) {
    console.error("[REFRESH] Failed", {
      error: error.message,
      stack: error.stack,
    });

    return res.sendStatus(500);
  }
};

/**
 * LOGOUT
 */
export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      console.info("[LOGOUT] No refresh token found");
      return res.sendStatus(204);
    }

    const activeTokens = await RefreshToken.find({ revokedAt: null });

    for (const t of activeTokens) {
      if (await compareHash(token, t.tokenHash)) {
        t.revokedAt = new Date();
        await t.save();

        console.info("[LOGOUT] Refresh token revoked", {
          userId: t.userId,
        });
        break;
      }
    }

    res.clearCookie("refreshToken");
    return res.sendStatus(204);
  } catch (error) {
    console.error("[LOGOUT] Failed", {
      error: error.message,
    });

    return res.sendStatus(500);
  }
};
