import { Router } from "express";
import { getAllUsers, getUserData } from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/data', userAuth, getUserData);

export default userRoutes;