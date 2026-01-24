import axios from "axios";

const BRIGHTDATA_URL = "https://api.brightdata.com/request";

function assertBrightDataConfig() {
  const missing = [];

  if (!process.env.BRIGHTDATA_TOKEN) missing.push("BRIGHTDATA_TOKEN");
  if (!process.env.BRIGHTDATA_ZONE) missing.push("BRIGHTDATA_ZONE");

  if (missing.length) {
    console.error("❌ BrightData config missing:", missing.join(", "));
    throw new Error(
      `Server misconfiguration: missing ${missing.join(", ")}`
    );
  }

  // Safe logs (NO secrets)
  console.log("✅ BrightData config loaded:", {
    zone: process.env.BRIGHTDATA_ZONE,
    token_present: true,
  });
}

export async function fetchSerpHtml(query) {
  // Validate once per call (cheap, safe)
  assertBrightDataConfig();

  try {
    const payload = {
      zone: process.env.BRIGHTDATA_ZONE,
      url: `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}&brd_mobile=desktop`,
      format: "raw",
    };

    // Debug payload (safe)
    console.log("➡️ BrightData request:", {
      zone: payload.zone,
      url: payload.url,
      format: payload.format,
    });

    const response = await axios.post(BRIGHTDATA_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BRIGHTDATA_TOKEN}`,
      },
      timeout: 30_000,
      validateStatus: () => true,
    });

    if (response.status < 200 || response.status >= 300) {
      console.error("❌ BrightData response error:", {
        status: response.status,
        data: response.data,
      });

      throw new Error(
        `BrightData SERP failed (${response.status}): ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );
    }

    console.log("✅ BrightData response OK:", {
      status: response.status,
      size: typeof response.data === "string" ? response.data.length : "json",
    });

    return response.data;
  } catch (error) {
    console.error("🔥 BrightData call failed:", {
      message: error.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });

    throw error;
  }
}
