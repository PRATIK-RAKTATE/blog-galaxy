import { loginApi, registerApi, logoutApi, isAuthenticatedApi } from "../api/auth.api";

export async function doLogin({ email, password }, { setLoading, setError, onSuccess }) {
  setLoading(true);
  setError("");

  try {
    const res = await loginApi({ email, password });

    if (!res.ok) {
      setError(res.error.message);
      return;
    }

    // Since cookie is httpOnly, verify session by calling auth check
    const auth = await isAuthenticatedApi();
    if (!auth.ok) {
      setError(auth.error.message || "Login succeeded but session check failed");
      return;
    }

    onSuccess?.(res.data); // {success, message}
  } catch (e) {
    setError(e?.message || "Unexpected error");
  } finally {
    setLoading(false);
  }
}

export async function doRegister({ name, email, password }, { setLoading, setError, onSuccess }) {
  setLoading(true);
  setError("");

  try {
    const res = await registerApi({ name, email, password });

    if (!res.ok) {
      setError(res.error.message);
      return;
    }

    // same: cookie-based session
    const auth = await isAuthenticatedApi();
    if (!auth.ok) {
      setError(auth.error.message || "Register succeeded but session check failed");
      return;
    }

    onSuccess?.(res.data);
  } catch (e) {
    setError(e?.message || "Unexpected error");
  } finally {
    setLoading(false);
  }
}

export async function doLogout({ setLoading, setError, onSuccess }) {
  setLoading(true);
  setError("");

  try {
    const res = await logoutApi();
    if (!res.ok) {
      setError(res.error.message);
      return;
    }
    onSuccess?.();
  } catch (e) {
    setError(e?.message || "Unexpected error");
  } finally {
    setLoading(false);
  }
}
