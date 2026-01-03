import asyncHandler from "../../utils/asyncHandler.js";
import * as authService from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

/* ---------- Register User ---------- */
export const registerController = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(ApiResponse.success(user, "User registered successfully"));
});

/* ---------- Login User ---------- */
export const loginController = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body);
  
  // Optionally, send refresh token as httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json(ApiResponse.success({ accessToken, user }, "Login successful"));
});

/* ---------- Refresh JWT Token ---------- */
export const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  const { accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(refreshToken);

  // Update cookie if necessary
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  res.status(200).json(ApiResponse.success({ accessToken }, "Token refreshed successfully"));
});

/* ---------- Logout User ---------- */
export const logoutController = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);
  
  // Clear cookie
  res.clearCookie("refreshToken");

  res.status(200).json(ApiResponse.success(null, "Logged out successfully"));
});
