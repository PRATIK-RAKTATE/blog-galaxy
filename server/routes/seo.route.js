import { Router } from "express";
import { analyzeSEO } from "../controllers/seo.controller.js";
import { createSeo } from "../controllers/createSeo.controller.js"

const router = Router();

router.post("/analyze", analyzeSEO);
router.post("/create", createSeo)

export default router;
