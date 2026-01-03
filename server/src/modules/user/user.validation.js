import Joi from "joi";

/* ---------- Update User Schema ---------- */
export const updateUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .messages({
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 50 characters",
    }),
  email: Joi.string()
    .trim()
    .email()
    .messages({
      "string.email": "Email must be a valid email address",
    }),
  password: Joi.string()
    .min(8)
    .max(128)
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at most 128 characters",
    }),
  role: Joi.string().valid("user", "admin").messages({
    "any.only": "Role must be either 'user' or 'admin'",
  }),
}).min(1); // Ensure at least one field is provided
