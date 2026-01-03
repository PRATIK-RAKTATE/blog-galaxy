/**
 * Custom API Error class
 * Usage: throw new ApiError(404, "User not found");
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string | string[]} message - Error message or array of messages
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message || "Internal Server Error";
    this.isOperational = true; // distinguish operational vs programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}
