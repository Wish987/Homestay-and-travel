"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getProfile, login as loginRequest, register as registerRequest } from "../services/authService";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("travel_token");

    if (!savedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    getProfile(savedToken)
      .then((data) => {
        setToken(savedToken);
        setUser(data.user || null);
      })
      .catch(() => {
        localStorage.removeItem("travel_token");
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    setAuthError(null);
    const response = await loginRequest(credentials);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("travel_token", response.token);
    return response;
  }, []);

  const register = useCallback(async (credentials) => {
    setAuthError(null);
    const response = await registerRequest(credentials);
    return response;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("travel_token");
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      authError,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      setAuthError,
    }),
    [user, token, loading, authError, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
