// src/auth/AuthProvider.js
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // 👈 NUEVO

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setCurrentUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem('authToken');
        setToken(null);
        setCurrentUser(null);
      }
    }

    setLoadingAuth(false);
  }, []);

  const isAdmin = Boolean(currentUser?.rol) && currentUser.rol.includes('admin');

  const isAuthenticated = Boolean(currentUser);

  const login = (data) => {
    const newToken = data.token;
    localStorage.setItem('authToken', newToken);
    const decodedUser = jwtDecode(newToken);
    setToken(newToken);
    setCurrentUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setCurrentUser(null);
  };

  const value = { 
    currentUser, 
    token,
    isAuthenticated, 
    isAdmin,
    login, 
    logout,
    loadingAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
