// src/pages/ProfilePage.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { perfilUsuario } from '../apiUsuarios';

export default function ProfilePage() {
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

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
    <>
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Mi perfil</h2>
          <p className="hero-subtitle">
            Revisá tus datos y mantené tu información actualizada.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  {loading && (
                    <p className="text-muted mb-0">Cargando tu perfil...</p>
                  )}

                  {!loading && errorMsg && (
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  {!loading && !errorMsg && datos && (
                    <>
                      <h3 className="mb-3 fw-semibold">
                        ¡Hola, {datos.username || 'usuario'}!
                      </h3>

                      <div className="mb-3">
                        <p className="mb-1 text-muted text-uppercase small">
                          Nombre de usuario
                        </p>
                        <p className="mb-0">{datos.username}</p>
                      </div>

                      <div className="mb-3">
                        <p className="mb-1 text-muted text-uppercase small">
                          Email
                        </p>
                        <p className="mb-0">{datos.email}</p>
                      </div>

                      {perfil?.createdAt && (
                        <div className="mb-3">
                          <p className="mb-1 text-muted text-uppercase small">
                            Miembro desde
                          </p>
                          <p className="mb-0">
                            {new Date(perfil.createdAt).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                      )}

                      {perfil?.updatedAt && (
                        <div className="mb-1">
                          <p className="mb-1 text-muted text-uppercase small">
                            Última actualización
                          </p>
                          <p className="mb-0">
                            {new Date(perfil.updatedAt).toLocaleString('es-AR')}
                          </p>
                        </div>
                      )}

                      <p className="mt-4 mb-0 text-muted small">
                        Próximamente vas a poder editar tus datos y ver más
                        información asociada a tu cuenta.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
