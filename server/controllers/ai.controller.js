import OpenAI from "openai";

/**
 * OpenAI client – singleton
 */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Backend-controlled instruction (SYSTEM PROMPT)
 * This should NEVER come from frontend
 */
const MY_TEXT = `
You are an SEO-focused generic content writer.
`;

/**
 * POST /
 * Body: { prompt: string }
 */
export const AIRoute = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "prompt is required and must be a non-empty string",
      });
    }

    // ✅ Combine backend instruction + user prompt
    const finalPrompt = `${MY_TEXT.trim()}\n\nUser request:\n${prompt.trim()}`;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: finalPrompt,
    });

    return res.status(200).json({
      success: true,
      output: response.output_text,
    });

  } catch (error) {
    console.error("OpenAI Controller Error:", {
      message: error.message,
      status: error.status,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
