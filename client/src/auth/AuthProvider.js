import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {jwtDecode} from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedUser = jwtDecode(token);
      setCurrentUser(decodedUser);
    }
  }, []);

  const isAuthenticated = Boolean(currentUser);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    const decodedUser = jwtDecode(token);
    setCurrentUser(decodedUser);
  };
 
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };
 
  const value = { currentUser, isAuthenticated, login, logout };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}