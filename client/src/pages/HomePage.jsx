import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function HomePage({ onGoCatalog, featuredProducts = [], onOpenProduct }) {
  // Accesibilidad: mantener aria-current en indicadores del carrusel (hero)
  useEffect(() => {
    const el = document.getElementById('heroCarousel');
    if (!el || !window.bootstrap) return;
    const instance = window.bootstrap.Carousel.getInstance(el) || new window.bootstrap.Carousel(el, { interval: 5000, ride: false });
    const onSlid = (e) => {
      const indicators = el.querySelectorAll('.carousel-indicators button');
      indicators.forEach((btn, idx) => {
        if (idx === e.to) btn.setAttribute('aria-current', 'true');
        else btn.removeAttribute('aria-current');
      });
    };
    el.addEventListener('slid.bs.carousel', onSlid);
    return () => el.removeEventListener('slid.bs.carousel', onSlid);
  }, []);

  const four = featuredProducts.slice(0, 4);

  return (
    <>
      {/* HERO con carrusel a pantalla completa con overlay centrado */}
      <section className="hero-carousel-section" aria-label="Presentación principal">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
          role="region"
          aria-roledescription="carrusel"
        >
          {/* Indicadores */}
          <div className="carousel-indicators" aria-label="Seleccionar diapositiva">
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Diapositiva 1: Nueva Colección"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="1"
              aria-label="Diapositiva 2: Artesanía Sustentable"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="2"
              aria-label="Diapositiva 3: Showroom Buenos Aires"
            ></button>
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            <div className="carousel-item active" role="group" aria-roledescription="diapositiva" aria-label="1 de 3">
              <div className="hero-slide">
                <img
                  src="/img/fondohero.jpg"
                  className="hero-slide-image"
                  alt="Ambiente con mobiliario de madera de Hermanos Jota"
                />
                <div className="hero-overlay">
                  <div className="hero-content-center">
                    <h2 className="hero-main-title">NUEVA COLECCIÓN</h2>
                    <p className="hero-main-subtitle">Diseño con historia, muebles con alma</p>
                    <button className="btn-hero-primary" onClick={onGoCatalog}>
                      Descubrir colección
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item" role="group" aria-roledescription="diapositiva" aria-label="2 de 3">
              <div className="hero-slide">
                <img
                  src="/img/ImagenHero1.png"
                  className="hero-slide-image"
                  alt="Taller y materiales sustentables"
                />
                <div className="hero-overlay">
                  <div className="hero-content-center">
                    <h2 className="hero-main-title">ARTESANÍA SUSTENTABLE</h2>
                    <p className="hero-main-subtitle">Materiales nobles, futuro responsable</p>
                    <a href="#sustentabilidad" className="btn-hero-primary">
                      Nuestro compromiso
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item" role="group" aria-roledescription="diapositiva" aria-label="3 de 3">
              <div className="hero-slide">
                <img
                  src="/img/ImagenHero2.png"
                  className="hero-slide-image"
                  alt="Showroom de Hermanos Jota en Buenos Aires"
                />
                <div className="hero-overlay">
                  <div className="hero-content-center">
                    <h2 className="hero-main-title">SHOWROOM BA</h2>
                    <p className="hero-main-subtitle">Vení a ver y elegir tu próxima pieza favorita</p>
                    <a href="#contacto" className="btn-hero-primary">
                      Visitanos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
            aria-label="Anterior"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
            aria-label="Siguiente"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* SOBRE NOSOTROS (video + copy) */}
      <section className="about-section py-5" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Media */}
            <div className="col-lg-6">
              <div className="about-media">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="img-fluid rounded about-video"
                  aria-label="Video sobre la historia de Hermanos Jota"
                >
                  <source src="/img/video_historia.mp4" type="video/mp4" />
                  <p>Tu navegador no soporta la etiqueta de video.</p>
                </video>
              </div>
            </div>

            {/* Texto */}
            <div className="col-lg-6">
              <div className="about-content">
                <span className="section-label">Nuestra Historia</span>
                <h2 className="section-title">Diseño con historia, muebles con alma</h2>
                <p className="about-text">
                  Hermanos Jota es el redescubrimiento de un arte: crear muebles que trascienden tendencias y
                  acompañan generaciones. Seleccionamos maderas responsables y aplicamos acabados naturales para
                  proteger su belleza y tacto.
                </p>
                <p className="about-text">
                  Cada pieza cuenta una historia de artesanía, carácter y precisión. Si querés empezar un proyecto a medida,
                  escribinos: estamos para ayudarte.
                </p>
                <button className="btn-secondary-custom" onClick={onGoCatalog}>Conocé más</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT: Sustentabilidad */}
      <section className="split-section" id="sustentabilidad">
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="split-content p-5">
                <span className="section-label-accent">Sustentabilidad</span>
                <h2 className="section-title">Compromiso con el futuro</h2>
                <p className="section-text-refined">
                  Nuestro compromiso con el medio ambiente y las futuras generaciones guía cada decisión en nuestro proceso creativo y productivo. Trabajamos con madera certificada FSC de bosques responsables argentinos, priorizando maderas nativas como algarrobo, quebracho y caldén.
                </p>
                <ul className="sustainability-stats list-unstyled d-flex gap-4">
                  <li className="stat-item">
                    <p className="stat-number">30%</p>
                    <p className="stat-label">Materiales reciclados</p>
                  </li>
                  <li className="stat-item">
                    <p className="stat-number">100%</p>
                    <p className="stat-label">Acabados naturales</p>
                  </li>
                </ul>
                <a href="#contacto" className="btn-secondary-custom">Programa Herencia Viva</a>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="split-image-container">
                <img src="/img/mesa_de_noche_aconcagua.png" alt="Mesa de noche Aconcagua" className="split-image w-100 h-100 object-fit-cover" />
                <div className="image-overlay">
                  <span className="image-label">MADERA CERTIFICADA FSC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="productos" className="products-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Productos Destacados</h2>

          {/* Desktop/Tablet ≥ md: grilla 4 columnas */}
          <div className="d-none d-md-block">
            {four.length ? (
              <div className="row g-4">
                {four.map(p => (
                  <div className="col-md-3" key={p.id}>
                    <ProductCard product={p} onClick={() => onOpenProduct ? onOpenProduct(p) : onGoCatalog()} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-3">Pronto verás aquí una selección de nuestras piezas favoritas.</p>
              </div>
            )}
          </div>

          {/* Mobile < md: carrusel de tarjetas */}
          <div className="d-block d-md-none">
            {four.length ? (
              <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4500">
                <div className="carousel-inner">
                  {four.map((p, idx) => (
                    <div className={"carousel-item" + (idx === 0 ? " active" : "")} key={p.id}>
                      <div className="px-4">
                        <ProductCard product={p} onClick={() => onOpenProduct ? onOpenProduct(p) : onGoCatalog()} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev" aria-label="Anterior">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next" aria-label="Siguiente">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-3">Pronto verás aquí una selección de nuestras piezas favoritas.</p>
              </div>
            )}
          </div>

          {/* CTA debajo de destacados (siempre visible) */}
          <div className="text-center mt-4">
            <button className="btn-secondary-custom mt-3 mb-5" onClick={onGoCatalog} aria-label="Ver todo el catálogo">
              Ver todo el catálogo
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
