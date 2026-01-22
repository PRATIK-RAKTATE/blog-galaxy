import { Router } from "express";
import { analyzeSEO } from "../controllers/seo.controller.js";

const router = Router();

router.post("/analyze", analyzeSEO);

export default router;
