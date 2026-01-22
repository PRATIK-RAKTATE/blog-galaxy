import OpenAI from "openai";

/**
 * OpenAI client – singleton
 */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Backend-controlled instruction (SYSTEM PROMPT)
 * NEVER accept this from frontend.
 *
 * Output contract:
 * - EXACTLY 1 <h1>
 * - EXACTLY 2 <h2>
 * - EXACTLY 3 <h3>
 * - ALL normal text MUST be inside <p>...</p>
 * - Output MUST be valid HTML only (no Markdown, no code fences)
 */
const MY_TEXT = `
You are an SEO-focused generic content writer.

output: {
    h1: {...} or "text",
    h2_1: {...} or "text",
    h2_2: {...} or "text",
    h3_1: {...} or "text",
    h3_2: {...} or "text",
    h3_3: {...} or "text",
    p1: {...} or "text",
    p2: {...} or "text",
    p3: {...} or "text",
    p4: {...} or "text"
  }
.
`.trim();

/**
 * POST /ai
 * Body: { prompt: string }
 */
export const createSeo = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "prompt is required and must be a non-empty string",
      });
    }

    const finalPrompt = `${MY_TEXT}\n\nUser request:\n${prompt.trim()}`;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: finalPrompt,
    });

    const html = (response?.output_text || "").trim();

    // Basic safety checks (cheap validation)
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    const h2Count = (html.match(/<h2\b/gi) || []).length;
    const h3Count = (html.match(/<h3\b/gi) || []).length;

    if (h1Count !== 1 || h2Count !== 2 || h3Count !== 3) {
      // If the model violates the contract, return a controlled response
      return res.status(502).json({
        success: false,
        message: "Model output did not match required HTML structure.",
        debug: { h1Count, h2Count, h3Count },
        output: html, // optional: remove in prod if you don't want to leak output
      });
    }

    return res.status(200).json({
      success: true,
      output: html,
    });
  } catch (error) {
    console.error("OpenAI Controller Error:", {
      message: error?.message,
      status: error?.status,
      code: error?.code,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
