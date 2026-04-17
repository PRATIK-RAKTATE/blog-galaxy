import { env } from "../../config/env.js";
import {
  analyzeTopicCompetition,
  generateAutomatedBlog,
} from "./serp-blog.service.js";

function validateTopicPayload({ topic }) {
  if (!topic || typeof topic !== "string" || !topic.trim()) {
    return "Topic is required";
  }

  if (topic.trim().length < 3) {
    return "Topic must be at least 3 characters";
  }

  if (topic.trim().length > 180) {
    return "Topic must be 180 characters or fewer";
  }

  return null;
}

export async function generateFromTopic(req, res, next) {
  try {
    const errorMessage = validateTopicPayload(req.body || {});

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    if (!env.groqApiKey) {
      return res.status(500).json({
        success: false,
        message: "GROQ_API_KEY is not configured",
      });
    }

    const result = await generateAutomatedBlog(req.body);

    return res.status(200).json({
      success: true,
      message: "SERP blog automation generated successfully",
      ...result,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.status(502).json({
        success: false,
        message: "AI returned an invalid JSON payload",
      });
    }

    if (error.message === "AI response did not return valid JSON") {
      return res.status(502).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

export async function checkTopicCompetition(req, res, next) {
  try {
    const errorMessage = validateTopicPayload(req.body || {});

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    if (!env.groqApiKey) {
      return res.status(500).json({
        success: false,
        message: "GROQ_API_KEY is not configured",
      });
    }

    const result = await analyzeTopicCompetition(req.body);

    return res.status(200).json({
      success: true,
      message: "Topic competition analysis generated successfully",
      ...result,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.status(502).json({
        success: false,
        message: "AI returned an invalid JSON payload",
      });
    }

    if (error.message === "AI response did not return valid JSON") {
      return res.status(502).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}
