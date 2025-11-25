// src/auth/AdminRoute.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loadingAuth } = useContext(AuthContext);
  const location = useLocation();

  if (loadingAuth) {
    return (
      <div className="product-list-state">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
