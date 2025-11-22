import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setCurrentUser(decodedUser);
        setToken(storedToken); // Actualizamos el estado del token
      } catch (error) {
        // Si el token es inválido o expiró, limpiamos todo por seguridad
        console.error("Token inválido", error);
        localStorage.removeItem('authToken');
        setToken(null);
        setCurrentUser(null);
      }
    }
  }, []);

  const isAuthenticated = Boolean(currentUser);

  const login = (data) => {
    const newToken = data.token;
    
    // 1. Guardar en LocalStorage (Persistencia)
    localStorage.setItem('authToken', newToken);
    
    // 2. Decodificar usuario
    const decodedUser = jwtDecode(newToken);
    
    // 3. Actualizar ambos estados de React
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
    login, 
    logout, 
  };

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};