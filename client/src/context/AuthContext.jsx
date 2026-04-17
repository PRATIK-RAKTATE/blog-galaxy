import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../lib/api";

const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
};

const AuthContext = createContext(null);

function readStoredSession() {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  const token = window.localStorage.getItem(STORAGE_KEYS.token);
  const userValue = window.localStorage.getItem(STORAGE_KEYS.user);

  if (!token) {
    return { token: null, user: null };
  }

  try {
    return {
      token,
      user: userValue ? JSON.parse(userValue) : null,
    };
  } catch {
    return {
      token,
      user: null,
    };
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());

  function writeSession({ token, user }) {
    if (token) {
      window.localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.token);
    }

    if (user) {
      window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.user);
    }

    setSession({ token: token || null, user: user || null });
  }

  useEffect(() => {
    const onStorage = () => setSession(readStoredSession());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: Boolean(session.token),
      setSession: writeSession,
      login: async ({ email, password }) => {
        const result = await loginRequest({ email, password });
        writeSession(result);
        return result;
      },
      register: async ({ name, email, password }) => {
        const result = await registerRequest({ name, email, password });
        writeSession(result);
        return result;
      },
      clearSession: () => {
        window.localStorage.removeItem(STORAGE_KEYS.token);
        window.localStorage.removeItem(STORAGE_KEYS.user);
        setSession({ token: null, user: null });
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
