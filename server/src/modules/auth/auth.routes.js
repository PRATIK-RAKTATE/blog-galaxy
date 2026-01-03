import { Router } from "express";
import { loginController, registerController, refreshTokenController, logoutController } from "./auth.controller.js";
import { validateBody } from "../../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/* ---------- Register User ---------- */
router.post("/register", validateBody(registerSchema), registerController);

/* ---------- Login User ---------- */
router.post("/login", validateBody(loginSchema), loginController);

/* ---------- Refresh JWT Token ---------- */
router.post("/refresh-token", refreshTokenController);

/* ---------- Logout User ---------- */
router.post("/logout", authenticate, logoutController);

export default router;
