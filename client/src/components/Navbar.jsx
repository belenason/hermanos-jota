import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, onNav }) {
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

    // Manejo del menú móvil (para que siempre sea sólido al abrir)
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

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light custom-navbar mb-3 fixed-top">
        <div className="container-fluid">
          <Link to="/" className='navbar-brand d-flex align-items-center me-auto ms-4 btn btn-link p-0 text-decoration-none'>
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

          <div className="collapse navbar-collapse d-sm-inline-flex justify-content-end me-2" id="mainNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/productos" className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none">Catálogo</Link>
              </li>
              <li className="nav-item">
                <Link to="/contacto" className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link to="/carrito" className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none" aria-label="Carrito de compras">
                  <span className="position-relative d-inline-block">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="badge rounded-pill elbadge">{cartCount}</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
