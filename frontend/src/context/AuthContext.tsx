"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiPost, ApiLoginResponse, ApiUser } from "@/lib/api";

type AuthContextValue = {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedToken = window.localStorage.getItem("token");
      const storedUser = window.localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {}
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiPost<ApiLoginResponse>("/login", { email, password });
    setToken(res.token);
    setUser(res.user);
    window.localStorage.setItem("token", res.token);
    window.localStorage.setItem("user", JSON.stringify(res.user));
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await apiPost("/register", { name, email, password });
    await login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    } catch {}
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  }), [user, token, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

