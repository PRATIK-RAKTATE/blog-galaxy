/**
 * Wraps async route handlers to automatically catch errors
 * and forward them to Express error middleware.
 *
 * Usage:
 * router.get("/route", asyncHandler(async (req, res) => {
 *    const data = await someAsyncFunction();
 *    res.json(data);
 * }));
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
