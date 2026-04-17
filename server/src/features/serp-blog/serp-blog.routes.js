import { Router } from "express";
import {
  checkTopicCompetition,
  generateFromTopic,
} from "./serp-blog.controller.js";

const router = Router();

router.post("/generate", generateFromTopic);
router.post("/competition-check", checkTopicCompetition);

export default router;
