/**
 * Standardized API response format
 */

export class ApiResponse {
  /**
   * Success response
   * @param {any} data - response payload
   * @param {string} message - success message
   * @param {number} statusCode - HTTP status code
   */
  static success(data = null, message = "Success", statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
    };
  }

  /**
   * Error response
   * @param {any} errors - error message(s)
   * @param {string} message - optional error summary
   * @param {number} statusCode - HTTP status code
   */
  static error(errors = null, message = "Error", statusCode = 400) {
    return {
      success: false,
      message,
      errors,
      statusCode,
    };
  }
}
