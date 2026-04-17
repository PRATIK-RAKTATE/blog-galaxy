import OpenAI from "openai";
import { env } from "../../config/env.js";

const groqClient = new OpenAI({
  apiKey: env.groqApiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateResponse({ input, model = "openai/gpt-oss-20b" }) {
  const response = await groqClient.responses.create({
    model,
    input: input.trim(),
  });

  return {
    model,
    output: response.output_text || "",
    response,
  };
}
