export function errorHandler(error, _req, res, _next) {
  return res.status(500).json({
    success: false,
    message: error?.message || "Internal server error",
  });
}
