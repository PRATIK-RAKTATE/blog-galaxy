import { normalizeApiError, normalizeNetworkError } from "./error.js";

/**
 * Standard result shape:
 * { ok: true, data, status }
 * { ok: false, error, status? }
 *
 * Backend returns:
 * { success: boolean, message: string, ... }
 */
export async function http(path, options = {}) {
  const {
    method = "GET",
    headers,
    body,
    timeoutMs = 15000,
  } = options;

  const baseUrl = import.meta.env.VITE_API_URL;
  const url = baseUrl
    ? `${String(baseUrl).replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`
    : path;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const finalHeaders = new Headers(headers || {});
  finalHeaders.set("Accept", "application/json");

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body != null && !isFormData) finalHeaders.set("Content-Type", "application/json");

  try {
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body,
      signal: controller.signal,

      // IMPORTANT for your backend: cookie auth (httpOnly cookie token)
      credentials: "include",
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const payload = isJson
      ? await res.json().catch(() => null)
      : await res.text().catch(() => null);

    // Your backend sometimes returns HTTP 200 with success:false
    const payloadSuccess = payload && typeof payload === "object" ? payload.success : undefined;

    if (!res.ok) {
      return { ok: false, status: res.status, error: normalizeApiError(res, payload) };
    }

    if (payloadSuccess === false) {
      return {
        ok: false,
        status: res.status,
        error: {
          message: payload.message || "Request failed",
          status: res.status,
          details: payload,
        },
      };
    }

    return { ok: true, status: res.status, data: payload };
  } catch (err) {
    return { ok: false, error: normalizeNetworkError(err) };
  } finally {
    clearTimeout(timeoutId);
  }
}
