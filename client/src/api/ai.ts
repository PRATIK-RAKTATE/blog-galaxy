// src/api/ai.ts

export type GenerateAIRequest = {
  prompt: string;
};

export type GenerateAIResponse = {
  success: true;
  output: string;
};

export type GenerateAIError = {
  success: false;
  message?: string;
  error?: string;
};

type GenerateAIResult = GenerateAIResponse | GenerateAIError;

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "https://blog-galaxy.onrender.com";
  console.log("API_BASE from ai.ts :", API_BASE);

// If you added backend auth middleware that checks `x-client-key`:
const CLIENT_KEY = import.meta.env.VITE_CLIENT_API_KEY as string | undefined;

export async function generateAI(prompt: string): Promise<string> {
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt must be a non-empty string.");
  }

  const url = `${API_BASE}/api/v1/ai`; // ✅ your route base

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CLIENT_KEY ? { "x-client-key": CLIENT_KEY } : {}),
    },
    body: JSON.stringify({ prompt: prompt.trim() } satisfies GenerateAIRequest),
  });

  let data: GenerateAIResult | null = null;

  // Try to parse JSON safely
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = (await res.json()) as GenerateAIResult;
    } catch {
      // ignore, handled below
    }
  }

  // Non-2xx
  if (!res.ok) {
    const msg =
      (data && "message" in data && data.message) ||
      (data && "error" in data && data.error) ||
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  // 2xx but invalid payload
  if (!data || !("success" in data) || data.success !== true || !("output" in data)) {
    throw new Error("Invalid response from server.");
  }

  return data.output;
}
