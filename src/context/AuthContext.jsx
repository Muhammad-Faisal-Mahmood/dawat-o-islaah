import { createContext, useState, useEffect, useContext, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getToken = () =>
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");

  const getUser = () =>
    sessionStorage.getItem("user") || localStorage.getItem("user");

  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const checkAuth = () => {
      const freshToken = getToken();
      const freshUser = getUser();

      setIsAuthenticated(!!freshToken);
      setToken(freshToken);
      setUser(freshUser);
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = (newToken, newUser, remember) => {
    if (remember) {
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("user", newUser);
    } else {
      sessionStorage.setItem("accessToken", newToken);
      sessionStorage.setItem("user", newUser);
    }

    setIsAuthenticated(true);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");

    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      token,
      user,
      login,
      logout,
      setIsAuthenticated, // optional: can be removed if not needed outside
    }),
    [isAuthenticated, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthData = () => useContext(AuthContext);
