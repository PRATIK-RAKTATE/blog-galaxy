import express from "express";
import { fetchSerpHtml } from "../services/brightData.service.js";

const router = express.Router();

router.get("/google", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Query parameter `q` is required",
    });
  }

  try {
    const html = await fetchSerpHtml(q);

    res.status(200).json({
      success: true,
      source: "google",
      query: q,
      raw_html: html,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
