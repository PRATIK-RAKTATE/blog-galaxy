import asyncHandler from "../../utils/asyncHandler.js";
import * as userService from "./user.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

/* ---------- Get All Users (Admin Only) ---------- */
export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(ApiResponse.success(users, "Users fetched successfully"));
});

/* ---------- Get User by ID ---------- */
export const getUserByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Admin can fetch any user, regular user can fetch only self
  if (req.user.role !== "admin" && req.user._id.toString() !== id) {
    return res.status(403).json(ApiResponse.error("Forbidden: Access denied"));
  }

  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json(ApiResponse.error("User not found"));
  }

  res.status(200).json(ApiResponse.success(user, "User fetched successfully"));
});

/* ---------- Update User ---------- */
export const updateUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Admin can update any user, regular user can update only self
  if (req.user.role !== "admin" && req.user._id.toString() !== id) {
    return res.status(403).json(ApiResponse.error("Forbidden: Access denied"));
  }

  const updatedUser = await userService.updateUser(id, updateData);
  res.status(200).json(ApiResponse.success(updatedUser, "User updated successfully"));
});

/* ---------- Delete User (Admin Only) ---------- */
export const deleteUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Only admins allowed
  if (req.user.role !== "admin") {
    return res.status(403).json(ApiResponse.error("Forbidden: Access denied"));
  }

  await userService.deleteUser(id);
  res.status(200).json(ApiResponse.success(null, "User deleted successfully"));
});
