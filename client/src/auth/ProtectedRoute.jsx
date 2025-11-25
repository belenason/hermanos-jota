// src/auth/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);
  const location = useLocation();

  if (loadingAuth) {
    return (
      <div className="product-list-state">
        <div className="loading-spinner"></div>
        <p>Cargando..</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
