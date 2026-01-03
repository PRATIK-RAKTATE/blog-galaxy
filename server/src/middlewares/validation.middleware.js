import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Middleware to validate request body against a Joi schema.
 * @param {Object} schema - Joi validation schema
 */
export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json(ApiResponse.error(errors, "Validation failed"));
  }

  req.body = value; // sanitized input
  next();
};

/**
 * Middleware to validate request query against a Joi schema
 * @param {Object} schema - Joi validation schema
 */
export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false, stripUnknown: true });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json(ApiResponse.error(errors, "Query validation failed"));
  }

  req.query = value; // sanitized query
  next();
};

/**
 * Middleware to validate request params against a Joi schema
 * @param {Object} schema - Joi validation schema
 */
export const validateParams = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params, { abortEarly: false, stripUnknown: true });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json(ApiResponse.error(errors, "Params validation failed"));
  }

  req.params = value; // sanitized params
  next();
};
