import { useEffect } from "react";

export function WakeUpService() {
  useEffect(() => {
    fetch("https://blog-galaxy.onrender.com/version")
      .then(() => console.log("main server is working"))
      .catch(() => {});

    fetch("https://blog-galaxy-stagging.onrender.com/version")
      .then(() => console.log("staging service is working"))
      .catch(() => {});
  }, []);

  return null;
}
