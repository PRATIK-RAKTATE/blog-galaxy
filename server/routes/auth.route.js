import { Router } from "express";
import { 
    isAuthenticated, 
    login, 
    logout, 
    register, 
    resetPassword, 
    sendResetOtp, 
    sendVerifyOtp, 
    verifyEmail 
} from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRoutes.post('/verify-account', userAuth, verifyEmail);
authRoutes.post('/is-auth', userAuth, isAuthenticated);
authRoutes.post('/send-reset-otp', sendResetOtp);
authRoutes.post('/reset-password', resetPassword);

export default authRoutes;