// src/components/Navbar.jsx
import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar({ cartCount, onNav }) {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector('.custom-navbar');
    const collapse = document.getElementById('mainNav');
    if (!navbar) return;

    const updateNavbar = () => {
      const isMobile = window.innerWidth < 768;
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (isMobile || scrollTop > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
      }
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);

    const onShow = () => {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    };
    const onHide = updateNavbar;

    if (collapse) {
      collapse.addEventListener('show.bs.collapse', onShow);
      collapse.addEventListener('hide.bs.collapse', onHide);
    }

    return () => {
      window.removeEventListener('scroll', updateNavbar);
      window.removeEventListener('resize', updateNavbar);
      if (collapse) {
        collapse.removeEventListener('show.bs.collapse', onShow);
        collapse.removeEventListener('hide.bs.collapse', onHide);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userLabel =
    currentUser?.username || currentUser?.email || 'Mi cuenta';

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light custom-navbar mb-3 fixed-top">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center me-auto ms-4 btn btn-link p-0 text-decoration-none"
          >
            <img
              className="rounded-circle me-3"
              src="/img/logo.svg"
              alt="Hermanos Jota"
              width="45"
              height="45"
            />
            <span className="fs-2 color-principal-texto font-encabezado titulo-navbar m-0">
              Hermanos Jota
            </span>
          </Link>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse d-sm-inline-flex justify-content-end me-2"
            id="mainNav"
          >
            <ul className="navbar-nav align-items-sm-center ms-auto">

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                >
                  Inicio
                </Link>
              </li>

              {/* Catálogo */}
              <li className="nav-item">
                <Link
                  to="/productos"
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                >
                  Catálogo
                </Link>
              </li>

              {/* Contacto */}
              <li className="nav-item">
                <Link
                  to="/contacto"
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                >
                  Contacto
                </Link>
              </li>

              {/* Carrito */}
              <li className="nav-item">
                <Link
                  to="/carrito"
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                  aria-label="Carrito de compras"
                >
                  <span className="position-relative d-inline-block">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="badge rounded-pill elbadge">
                      {cartCount}
                    </span>
                  </span>
                </Link>
              </li>

              {/* Menú de usuario */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none d-flex align-items-center gap-2"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i className="bi bi-person-circle fs-4"></i>
                  {/* En mobile solo icono; en desktop también texto */}
                  <span className="d-none d-md-inline">
                    {isAuthenticated ? userLabel : 'Cuenta'}
                  </span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userMenu"
                >
                  {isAuthenticated ? (
                    <>
                      <li>
                        <Link to="/perfil" className="dropdown-item">
                          Mi perfil
                        </Link>
                      </li>
                      <li>
                        <Link to="/mis-pedidos" className="dropdown-item">
                          Mis pedidos
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="dropdown-item">
                          Iniciar sesión
                        </Link>
                      </li>
                      <li>
                        <Link to="/registro" className="dropdown-item">
                          Registrarse
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
