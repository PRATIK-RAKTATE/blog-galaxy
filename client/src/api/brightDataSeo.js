// src/api/brightdata.js
import axios from "axios";

/**
 * Backend base URL rules:
 * - Use VITE_BACKEND_URL if provided (ex: https://blog-galaxy.onrender.com)
 * - Otherwise fall back to same-origin (""), which works with Vite proxy in dev.
 */
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

// Your Express route is: router.get("/google"...)
// This file should call the mounted path.
// Example if mounted at /api/v1/brightdata => /api/v1/brightdata/google
const BRIGHTDATA_BASE_PATH = "/api/v1/seo";

const API_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2; // keep small; avoid hammering
const RETRY_BASE_DELAY_MS = 350;

// Toggle debug logs without changing code:
// VITE_API_DEBUG=true
const DEBUG =
  String(import.meta.env.VITE_API_DEBUG || "").toLowerCase() === "true";

function debugLog(...args) {
  if (DEBUG) console.log("[brightdata-api]", ...args);
}

function debugWarn(...args) {
  if (DEBUG) console.warn("[brightdata-api]", ...args);
}

function debugError(...args) {
  if (DEBUG) console.error("[brightdata-api]", ...args);
}

function createRequestId() {
  // Safe correlation id for client logs <-> server logs
  // Use crypto.randomUUID when available (modern browsers)
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isRetryableError(err) {
  // Axios classification:
  // - Network errors: err.code may exist, err.response is undefined
  // - Timeout: err.code === 'ECONNABORTED' (axios)
  // - Backend errors: err.response.status exists

  if (!err) return false;

  // Abort should never retry
  if (err.name === "CanceledError") return false;

  // Timeout / network
  if (!err.response) return true;

  const status = err.response.status;
  // Retry on 429 (rate limit) and 5xx server errors
  if (status === 429) return true;
  if (status >= 500 && status <= 599) return true;

  return false;
}

function computeBackoff(attempt) {
  // attempt: 0..MAX_RETRIES
  const jitter = Math.floor(Math.random() * 150);
  return RETRY_BASE_DELAY_MS * Math.pow(2, attempt) + jitter;
}

function normalizeError(err, ctx) {
  // Make a clean error object for UI / debugging.
  // Never dump huge raw_html in logs.
  const base = {
    name: err?.name || "Error",
    message: "Request failed",
    requestId: ctx.requestId,
    url: ctx.url,
    method: ctx.method,
    query: ctx.query,
    status: undefined,
    kind: "unknown", // "network" | "timeout" | "http" | "abort" | "unknown"
    details: undefined,
  };

  if (err?.name === "CanceledError") {
    return { ...base, message: "Request cancelled", kind: "abort" };
  }

  if (!err?.response) {
    // network/timeout
    if (err?.code === "ECONNABORTED") {
      return { ...base, message: "Request timed out", kind: "timeout" };
    }
    return { ...base, message: "Network error (no response)", kind: "network" };
  }

  const status = err.response.status;
  const data = err.response.data;

  // Your backend returns:
  // { success: false, message: err.message }
  const serverMessage =
    (data && typeof data === "object" && data.message) ? String(data.message) : undefined;

  return {
    ...base,
    status,
    kind: "http",
    message: serverMessage || `HTTP error (${status})`,
    details:
      data && typeof data === "object"
        ? { ...data, raw_html: undefined } // never forward massive html in error details
        : data,
  };
}

/**
 * Axios instance used everywhere for backend calls.
 * NOTE: baseURL should be backend origin only, not include /api/v1/auth.
 */
const api = axios.create({
  baseURL: BACKEND_URL || undefined,
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
  // Keep default validateStatus (2xx). We'll handle errors via catch.
});

api.interceptors.request.use((config) => {
  const requestId = createRequestId();
  config.headers = config.headers || {};
  config.headers["X-Request-Id"] = requestId;
  config.metadata = { requestId, startMs: Date.now() };

  debugLog("request", {
    requestId,
    method: config.method,
    baseURL: config.baseURL,
    url: config.url,
    timeout: config.timeout,
  });

  return config;
});

api.interceptors.response.use(
  (response) => {
    const requestId = response.config?.metadata?.requestId;
    const startMs = response.config?.metadata?.startMs;
    debugLog("response", {
      requestId,
      status: response.status,
      ms: typeof startMs === "number" ? Date.now() - startMs : undefined,
    });
    return response;
  },
  (error) => {
    const cfg = error?.config;
    const requestId = cfg?.metadata?.requestId;
    const startMs = cfg?.metadata?.startMs;
    debugWarn("response_error", {
      requestId,
      status: error?.response?.status,
      ms: typeof startMs === "number" ? Date.now() - startMs : undefined,
      message: error?.message,
    });
    return Promise.reject(error);
  }
);

/**
 * Fetch Google SERP HTML via your backend BrightData route.
 *
 * @param {string} q - search query
 * @param {{ signal?: AbortSignal, retries?: number }} [opts]
 * @returns {Promise<{success: boolean, source: string, query: string, raw_html: string}>}
 */
export async function getSeoData(q, opts = {}) {
  if (typeof q !== "string" || !q.trim()) {
    throw new Error("Query 'q' is required and must be a non-empty string.");
  }

  const retries = Number.isFinite(opts.retries) ? Math.max(0, opts.retries) : MAX_RETRIES;

  const endpoint = `${BRIGHTDATA_BASE_PATH}/google`;
  const ctx = {
    requestId: undefined,
    method: "GET",
    url: endpoint,
    query: q,
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await api.get(endpoint, {
        params: { q },
        signal: opts.signal,
      });

      // Expecting your backend JSON shape:
      // { success: true, source, query, raw_html }
      const data = response.data;

      if (!data || typeof data !== "object") {
        // Backend returned non-JSON or unexpected shape
        const err = new Error("Invalid response shape from backend");
        err.response = { status: response.status, data: response.data };
        throw err;
      }

      if (data.success !== true) {
        // Backend says failure but responded 2xx (shouldn't, but tolerate)
        const err = new Error(data.message || "Backend reported failure");
        err.response = { status: response.status, data };
        throw err;
      }

      // Minimal sanity checks (avoid crashing downstream)
      if (typeof data.raw_html !== "string") {
        const err = new Error("Backend response missing raw_html string");
        err.response = { status: response.status, data };
        throw err;
      }

      return data;
    } catch (err) {
      // Attach requestId if available
      ctx.requestId = err?.config?.metadata?.requestId || ctx.requestId;

      // If abort, immediately throw
      if (err?.name === "CanceledError") {
        throw normalizeError(err, ctx);
      }

      const retryable = isRetryableError(err);
      const isLast = attempt >= retries;

      const normalized = normalizeError(err, ctx);

      debugError("attempt_failed", {
        attempt,
        retries,
        retryable,
        isLast,
        normalized,
      });

      if (!retryable || isLast) {
        // Throw a normalized error so UI can show clean message and you can log requestId
        throw normalized;
      }

      const delay = computeBackoff(attempt);
      debugLog("retrying_after_ms", { attempt, delay, requestId: normalized.requestId });
      await sleep(delay);
    }
  }

  // Should never reach
  throw new Error("Unexpected retry loop exit");
}

export default getSeoData;
