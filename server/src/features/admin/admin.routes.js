import { Router } from "express";
import { analytics } from "./admin.controller.js";

const router = Router();

router.get("/analytics", analytics);

export default router;
