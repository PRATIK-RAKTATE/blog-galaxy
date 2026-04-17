import { Router } from "express";
import { create, getByIdOrSlug, list, remove, update } from "./blog.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, create);
router.get("/", list);
router.get("/:blogIdOrSlug", getByIdOrSlug);
router.put("/:blogIdOrSlug", requireAuth, update);
router.delete("/:blogIdOrSlug", requireAuth, remove);

export default router;
