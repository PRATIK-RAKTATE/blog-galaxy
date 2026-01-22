import { Router } from "express";
import { AIRoute } from "../controllers/ai.controller.js";

const aiRoutes = Router();

aiRoutes.post("/", AIRoute);

export default aiRoutes;
