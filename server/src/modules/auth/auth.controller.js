import { RefreshToken } from "../user/refreshToken.model.js";
import { compareHash, hashValue } from "../../utils/hash.js";
import { setRefreshCookie } from "../../utils/cookie.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";
import { registerUser, loginUser } from "../auth/auth.service.js";

export const register = async (req, res) => {
  const user = await registerUser(req.body.email, req.body.password);
  res.status(201).json({ id: user._id });
};

export const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser(
    req.body.email,
    req.body.password,
    { ipAddress: req.ip, userAgent: req.headers["user-agent"] }
  );

  setRefreshCookie(res, refreshToken);
  res.json({ accessToken });
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const stored = await RefreshToken.findOne({ revokedAt: null });
  if (!stored) return res.sendStatus(401);

  const valid = await compareHash(token, stored.tokenHash);
  if (!valid) return res.sendStatus(401);

  stored.revokedAt = new Date();
  const newRefresh = generateRefreshToken();
  stored.replacedByToken = await hashValue(newRefresh);
  await stored.save();

  await RefreshToken.create({
    userId: stored.userId,
    tokenHash: await hashValue(newRefresh),
    expiresAt: stored.expiresAt,
  });

  setRefreshCookie(res, newRefresh);
  res.json({ accessToken: generateAccessToken({ _id: stored.userId }) });
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const tokens = await RefreshToken.find();
    for (const t of tokens) {
      if (await compareHash(token, t.tokenHash)) {
        t.revokedAt = new Date();
        await t.save();
      }
    }
  }
  res.clearCookie("refreshToken");
  res.sendStatus(204);
};
