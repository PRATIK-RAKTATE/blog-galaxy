import { Router } from "express";
import { generateAIResponse } from "./ai.controller.js";

const router = Router();

router.post("/generate", generateAIResponse);

export default router;
