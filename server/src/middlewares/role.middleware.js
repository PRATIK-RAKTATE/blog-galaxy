import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Middleware to restrict access based on user roles.
 * Usage: authorize("admin", "manager")
 * @param  {...string} allowedRoles - Roles allowed to access the route
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is attached by authenticate middleware
    if (!req.user) {
      return res.status(401).json(ApiResponse.error("Unauthorized: User not authenticated"));
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json(ApiResponse.error("Forbidden: Access denied"));
    }

    next();
  };
};
