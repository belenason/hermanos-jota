import { useEffect } from 'react';

export default function Navbar({ cartCount, currentView, onNav }) {
  useEffect(() => {
    const navbar = document.querySelector('.custom-navbar');
    const collapse = document.getElementById('mainNav');
    const mainEl = document.querySelector('main'); // contenedor que puede estar scrollando

    if (!navbar) return;

    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;
    const isProductView = currentView === 'product';

    const getScrollTop = () => {
      const w = window.scrollY || 0;
      const d = document.documentElement?.scrollTop || document.body?.scrollTop || 0;
      const m = mainEl?.scrollTop || 0;
      // tomamos el mayor por si distintos motores actualizan lugares distintos
      return Math.max(w, d, m);
    };

    const applyNavbarState = () => {
      // Mobile: siempre sólido
      if (!isDesktop()) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
        return;
      }

      // Página de producto: siempre sólido
      if (isProductView) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
        return;
      }

      // Desktop otras vistas: transparente solo "arriba"
      const top = getScrollTop();
      if (top > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
      }
    };

    // Inicial (dos ticks por si el layout tarda en pintar)
    applyNavbarState();
    requestAnimationFrame(applyNavbarState);
    setTimeout(applyNavbarState, 0);

    // Escuchas de scroll y resize
    window.addEventListener('scroll', applyNavbarState, { passive: true });
    window.addEventListener('resize', applyNavbarState);
    if (mainEl) mainEl.addEventListener('scroll', applyNavbarState, { passive: true });

    // Colapso móvil: al abrir, forzá sólido; al cerrar, recalculá
    const onShow = () => {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    };
    const onHide = () => applyNavbarState();

    if (collapse) {
      collapse.addEventListener('show.bs.collapse', onShow);
      collapse.addEventListener('hide.bs.collapse', onHide);
    }

    return () => {
      window.removeEventListener('scroll', applyNavbarState);
      window.removeEventListener('resize', applyNavbarState);
      if (mainEl) mainEl.removeEventListener('scroll', applyNavbarState);
      if (collapse) {
        collapse.removeEventListener('show.bs.collapse', onShow);
        collapse.removeEventListener('hide.bs.collapse', onHide);
      }
    };
  }, [currentView]);

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light custom-navbar mb-3 fixed-top">
        <div className="container-fluid">
          <button 
            className="navbar-brand d-flex align-items-center me-auto ms-4 btn btn-link p-0 text-decoration-none"
            onClick={() => onNav('home')}
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
          </button>

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
                <button 
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                  onClick={() => onNav('catalog')}
                >
                  Catálogo
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                  onClick={() => onNav('contact')}
                >
                  Contacto
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link fs-5 px-3 py-2 fw-semibold color-principal-texto text-decoration-none"
                  type="button"
                  aria-label="Carrito de compras"
                >
                  <span className="position-relative d-inline-block">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="badge rounded-pill elbadge">{cartCount}</span>
                  </span>
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}