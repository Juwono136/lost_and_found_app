import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../features/auth/authService";
import tokenService from "../features/token/tokenService";

const API_BASE = import.meta.env.VITE_USER_API_URL; 
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser]     = useState(() => JSON.parse(localStorage.getItem("user")));
  const [role, setRole]     = useState(user?.selectedRole || null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // — LOGIN —
  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.signin(credentials);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setRole(data.selectedRole);
      await tokenService.refreshToken();
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // — LOGOUT —
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      localStorage.removeItem("user");
      tokenService.clearToken();
      setUser(null);
      setRole(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // — ROLE SELECTION (if your API asks) —
  const selectRole = async ({ userId, selectedRole }) => {
    const data = await authService.selectRole({ current: userId, selectedRole });
    setRole(selectedRole);
    // also persist on `user` object if you need:
    setUser(u => ({ ...u, selectedRole }));
    await tokenService.refreshToken();
    return data;
  };

  // — ATTEMPT TO REFRESH TOKEN ON APP START —
  useEffect(() => {
    (async () => {
      try {
        await tokenService.refreshToken();
      } catch (err) {
        console.warn("Could not refresh on load:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const value = {
    user,
    role,
    loading,
    error,
    login,
    logout,
    selectRole,
    refreshToken: tokenService.refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
