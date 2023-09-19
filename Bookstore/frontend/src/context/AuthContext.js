import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkLogged = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUser(user);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    checkLogged()
  };

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false);
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};