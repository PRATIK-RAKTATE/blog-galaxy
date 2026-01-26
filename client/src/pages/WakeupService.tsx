import { useEffect } from "react";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

export function WakeUpService() {
  useEffect(() => {
    fetch(`${BASE_URL}/version`)
      .then(() => console.log("main server is working"))
      .catch(() => {});

  }, []);

  return null;
}
