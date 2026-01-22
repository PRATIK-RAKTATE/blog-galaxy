export function normalizeApiError(res, payload) {
  const message =
    (payload && typeof payload === "object" && payload.message) ||
    res.statusText ||
    "Request failed";

  return {
    message,
    status: res.status,
    details: payload ?? null,
  };
}

export function normalizeNetworkError(err) {
  const isAbort =
    err &&
    (err.name === "AbortError" || String(err.message || "").includes("aborted"));

  return {
    message: isAbort ? "Request timeout" : (err?.message || "Network error"),
    code: isAbort ? "TIMEOUT" : "NETWORK_ERROR",
    details: err ?? null,
  };
}
