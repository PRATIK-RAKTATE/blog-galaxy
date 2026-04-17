import { loginUser, registerUser } from "./auth.service.js";

function validateCredentials({ name, email, password }, requireName = false) {
  if (requireName && (!name || typeof name !== "string" || !name.trim())) {
    return "Name is required";
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return "Email is required";
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

export async function register(req, res, next) {
  try {
    const errorMessage = validateCredentials(req.body, true);

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errorMessage = validateCredentials(req.body, false);

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}
