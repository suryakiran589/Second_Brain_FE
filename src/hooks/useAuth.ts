import { useEffect, useState } from "react";
import type { User } from "../types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status when app loads
    fetch("http://localhost:5000/api/v1/", {
      // credentials: "include", // include cookies
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, setUser };
}

