// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    // Update auth status if token changes externally
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);

    console.log("logoutTriggered");
  };
  const login = (token, user, remember) => {
    if (remember) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", user);
    } else {
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("user", user);
    }
    setIsAuthenticated(true);
  };

  const user = sessionStorage.getItem("user") || localStorage.getItem("user");
  const token =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
        login,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => {
  return useContext(AuthContext);
};
