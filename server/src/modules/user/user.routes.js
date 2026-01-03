import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "./user.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js"; // Role-based access control
import { validateBody } from "../../middlewares/validation.middleware.js";
import { updateUserSchema } from "./user.validation.js";

const router = Router();

/* ---------- Get All Users (Admin Only) ---------- */
router.get("/", authenticate, authorize("admin"), getAllUsersController);

/* ---------- Get User by ID (Admin + Self) ---------- */
router.get("/:id", authenticate, getUserByIdController);

/* ---------- Update User (Self or Admin) ---------- */
router.put("/:id", authenticate, validateBody(updateUserSchema), updateUserController);

/* ---------- Delete User (Admin Only) ---------- */
router.delete("/:id", authenticate, authorize("admin"), deleteUserController);

export default router;
