import { http } from "@/lib/http/client";

export function registerApi({ name, email, password }) {
  return http("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function loginApi({ email, password }) {
  return http("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutApi() {
  return http("/auth/logout", { method: "POST" });
}

export function isAuthenticatedApi() {
  return http("/auth/is-authenticated", { method: "GET" });
}
