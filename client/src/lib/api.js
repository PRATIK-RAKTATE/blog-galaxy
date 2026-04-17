const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("auth_token");
}

async function request(path, options = {}) {
  const token = options.auth ? getStoredToken() : null;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function registerRequest(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginRequest(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBlogsRequest() {
  return request("/blogs");
}

export function getBlogRequest(blogIdOrSlug) {
  return request(`/blogs/${blogIdOrSlug}`);
}

export function createBlogRequest(payload) {
  return request("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function updateBlogRequest(blogIdOrSlug, payload) {
  return request(`/blogs/${blogIdOrSlug}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function deleteBlogRequest(blogIdOrSlug) {
  return request(`/blogs/${blogIdOrSlug}`, {
    method: "DELETE",
    auth: true,
  });
}

export function generateAIRequest(payload) {
  return request("/ai/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function generateSerpBlogRequest(payload) {
  return request("/serp-blog/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function checkTopicCompetitionRequest(payload) {
  return request("/serp-blog/competition-check", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
