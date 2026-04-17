import { env } from "../../config/env.js";
import { generateResponse } from "./ai.service.js";

export async function generateAIResponse(req, res, next) {
  try {
    const { input, model = "openai/gpt-oss-20b" } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res.status(400).json({
        success: false,
        message: "Input is required and must be a non-empty string",
      });
    }

    if (!env.groqApiKey) {
      return res.status(500).json({
        success: false,
        message: "GROQ_API_KEY is not configured",
      });
    }

    const result = await generateResponse({ input, model });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("AI GENERATION ERROR:", error);
    next(error);
  }
}
