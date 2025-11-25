// src/components/Navbar.jsx
import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar({ cartCount, onNav }) {
  const { isAuthenticated, currentUser, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Cerrar menú al cambiar de ruta (igual idea que el ejemplo que pasaste)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Cerrar menú al hacer click fuera de la navbar
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleDocumentClick = (event) => {
      const navbar = document.querySelector('.custom-navbar');
      if (!navbar) return;

      // Si el click NO fue dentro de la navbar, cerramos
      if (!navbar.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const userLabel =
    currentUser?.username || currentUser?.email || 'Mi cuenta';

  // Función para verificar si la ruta está activa
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light custom-navbar fixed-top">
        <div className="container-fluid px-4">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center me-auto btn btn-link p-0 text-decoration-none"
            onClick={handleNavLinkClick}
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
            aria-controls="mainNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse d-sm-inline-flex justify-content-end ${isMenuOpen ? "show" : ""}`}
            id="mainNav"
          >
            <ul className="navbar-nav align-items-sm-center ms-auto gap-1">

              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link nav-link-modern ${isActive('/') ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
                  Inicio
                </Link>
              </li>

              {/* Catálogo */}
              <li className="nav-item">
                <Link
                  to="/productos"
                  className={`nav-link nav-link-modern ${isActive('/productos') ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
                  Catálogo
                </Link>
              </li>

              {/* Contacto */}
              <li className="nav-item">
                <Link
                  to="/contacto"
                  className={`nav-link nav-link-modern ${isActive('/contacto') ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
                  Contacto
                </Link>
              </li>

              {/* Carrito */}
              <li className="nav-item">
                <Link
                  to="/carrito"
                  className={`nav-link nav-link-modern nav-link-icon ${isActive('/carrito') ? 'active' : ''}`}
                  aria-label="Carrito de compras"
                  onClick={handleNavLinkClick}
                >
                  <span className="position-relative d-inline-block">
                    <i className="bi bi-cart3 fs-5"></i>
                    {cartCount > 0 && (
                      <span className="badge rounded-pill elbadge">
                        {cartCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>

              {/* Separador vertical */}
              <li className="nav-separator d-none d-sm-block"></li>

              {/* Menú de usuario */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link nav-link-modern nav-link-user dropdown-toggle  ${
                    isActive('/perfil') ||
                    isActive('/mis-pedidos') ||
                    isActive('/admin') ||
                    isActive('/login') ||
                    isActive('/registro')
                      ? 'active'
                      : ''
                  }`}
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i className="bi bi-person-circle personita fs-5"></i>
                  <span className="d-none d-lg-inline user-label">
                    {isAuthenticated ? userLabel : ''}
                  </span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-modern"
                  aria-labelledby="userMenu"
                >
                  {isAuthenticated ? (
                    <>
                      <li>
                        <Link to="/perfil" className="dropdown-item" onClick={handleNavLinkClick}>
                          <i className="bi bi-person me-2"></i>
                          Mi perfil
                        </Link>
                      </li>
                      <li>
                        <Link to="/mis-pedidos" className="dropdown-item" onClick={handleNavLinkClick}>
                          <i className="bi bi-bag-check me-2"></i>
                          Mis pedidos
                        </Link>
                      </li>
                      {isAdmin && (
                        <>
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <Link to="/admin" className="dropdown-item text-primary" onClick={handleNavLinkClick}>
                              <i className="bi bi-shield-lock me-2"></i>
                              Panel Admin
                            </Link>
                          </li>
                        </>
                      )}
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Cerrar sesión
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="dropdown-item" onClick={handleNavLinkClick}>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Iniciar sesión
                        </Link>
                      </li>
                      <li>
                        <Link to="/registro" className="dropdown-item" onClick={handleNavLinkClick}>
                          <i className="bi bi-person-plus me-2"></i>
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
