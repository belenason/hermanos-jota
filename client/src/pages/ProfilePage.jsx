// src/pages/ProfilePage.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { perfilUsuario } from '../apiUsuarios';

export default function ProfilePage() {
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Si no está logueado, mandarlo al login
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const cargarPerfil = async () => {
      try {
        const data = await perfilUsuario(token);
        setPerfil(data);
      } catch (error) {
        console.error('Error cargando perfil:', error);
        setErrorMsg(error.message || 'No se pudo cargar tu perfil.');
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, [isAuthenticated, navigate]);

  const datos = perfil || currentUser;

  return (
    <div className="profile-layout">
      {/* Animación de fondo minimalista */}
      <div className="bg-animation">
        <div className="float-circle circle-1"></div>
        <div className="float-circle circle-2"></div>
        <div className="float-circle circle-3"></div>
      </div>

      <div className="profile-grid">
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando perfil...</p>
          </div>
        )}

        {!loading && errorMsg && (
          <div className="error-card">
            <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2"/>
            </svg>
            <p>{errorMsg}</p>
          </div>
        )}

        {!loading && !errorMsg && datos && (
          <>
            {/* Sidebar izquierdo con avatar */}
            <aside className="profile-sidebar">
              <div className="avatar-section">
                <div className="avatar-large">
                  {(datos.username || 'U').charAt(0).toUpperCase()}
                </div>
                <h1 className="user-name">{datos.username}</h1>
                <span className="member-badge">Miembro activo</span>
              </div>
            </aside>

            {/* Contenido principal */}
            <main className="profile-main">
              <div className="content-header">
                <h2 className="section-title-profile">Información personal</h2>
              </div>

              <div className="info-cards">
                <div className="data-card">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="card-content">
                    <span className="card-label">Correo electrónico</span>
                    <span className="card-value">{datos.email}</span>
                  </div>
                </div>

                {perfil?.createdAt && (
                  <div className="data-card">
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="card-content">
                      <span className="card-label">Fecha de registro</span>
                      <span className="card-value">
                        {new Date(perfil.createdAt).toLocaleDateString('es-AR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="actions-bar">
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/mis-pedidos')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="2"/>
                    <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2"/>
                    <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2"/>
                  </svg>
                  Ver mis pedidos
                </button>
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}