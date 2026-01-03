import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../modules/user/user.model.js"; // Mongoose model
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Middleware to authenticate requests via JWT access token
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json(ApiResponse.error("Unauthorized: No token provided"));
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Attach user object to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json(ApiResponse.error("Unauthorized: User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(ApiResponse.error("Unauthorized: Invalid token"));
  }
});

/**
 * Middleware for role-based access control
 * @param  {...string} roles - allowed roles for the route
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(ApiResponse.error("Unauthorized: User not authenticated"));
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(ApiResponse.error("Forbidden: Access denied"));
    }

    next();
  };
};
