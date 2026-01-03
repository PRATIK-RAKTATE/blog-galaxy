import User from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";

/* ---------- Get All Users ---------- */
export const getAllUsers = async () => {
  return await User.find().select("-password"); // Exclude passwords
};

/* ---------- Get User By ID ---------- */
export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

/* ---------- Update User ---------- */
export const updateUser = async (id, updateData) => {
  if (updateData.password) {
    throw new ApiError(400, "Password updates are handled via /change-password route"); 
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    select: "-password",
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

/* ---------- Delete User ---------- */
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return true;
};
