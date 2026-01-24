const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://blog-galaxy.onrender.com/api/v1/auth';

console.log(API_URL)

type LoginCredentials = { email: string; password: string };
export type LoginResponse = { token: string; message?: string };

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const raw = await res.text();

  let data: any;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    throw new Error(raw || `Non-JSON response (${res.status})`);
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Login failed (${res.status})`);
  }

  // ✅ Handle 200 OK but success: false (Backend logic failure)
  if (data?.success === false) {
    throw new Error(data.message || "Login failed");
  }

  // ✅ guarantee token presence
  if (!data?.token) {
    throw new Error("Login failed: server did not return a token.");
  }

  return data as LoginResponse;
}

export type RegisterCredentials = { name: string; email: string; password: string };

export async function registerUser(credentials: RegisterCredentials): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const raw = await res.text();
  let data: any;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    throw new Error(raw || `Non-JSON response (${res.status})`);
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Registration failed (${res.status})`);
  }

  // ✅ Handle 200 OK but success: false
  if (data?.success === false) {
    throw new Error(data.message || "Registration failed");
  }

  if (!data?.token) {
    throw new Error("Registration failed: server did not return a token.");
  }

  return data as LoginResponse;
}
