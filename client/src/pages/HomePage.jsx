import { useEffect, useState } from 'react'; // NUEVO: importar useState
import ProductCardGrid from '../components/ProductCardGrid';
import { Link } from 'react-router-dom';

// NUEVO: Definimos el contenido del carrusel como un array de objetos.
// Esto nos permite generarlo dinámicamente y no repetir HTML.
const heroSlides = [
  {
    img: "/img/fondohero.jpg",
    alt: "Ambiente con mobiliario de madera de Hermanos Jota",
    title: "NUEVA COLECCIÓN",
    subtitle: "Diseño con historia, muebles con alma",
    link: "/productos",
    linkLabel: "Descubrir colección",
    isReactLink: true
  },
  {
    img: "/img/ImagenHero1.png",
    alt: "Taller y materiales sustentables",
    title: "ARTESANÍA SUSTENTABLE",
    subtitle: "Materiales nobles, futuro responsable",
    link: "#sustentabilidad",
    linkLabel: "Nuestro compromiso",
    isReactLink: false
  },
  {
    img: "/img/ImagenHero2.png",
    alt: "Showroom de Hermanos Jota en Buenos Aires",
    title: "SHOWROOM BA",
    subtitle: "Vení a ver y elegir tu próxima pieza favorita",
    link: "#contacto",
    linkLabel: "Visitanos",
    isReactLink: false
  }
];

export default function HomePage({ featuredProducts = [], onAdd }) { 
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, []); 

  useEffect(() => {
    const el = document.getElementById('heroCarousel');
    if (!el || !window.bootstrap) return;

    const onSlid = (e) => {
      // Actualiza el estado de React con el índice del nuevo slide
      setActiveIndex(e.to);
    };

    el.addEventListener('slid.bs.carousel', onSlid);
    return () => el.removeEventListener('slid.bs.carousel', onSlid);
  }, []); 

  const four = featuredProducts.slice(0, 4);

  return (
    <>
      <section className="hero-carousel-section" aria-label="Presentación principal">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
          role="region"
          aria-roledescription="carrusel"
        >
          {/*ndicadores generados dinámicamente */}
          <div className="carousel-indicators" aria-label="Seleccionar diapositiva">
            {heroSlides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={idx}
                // La clase 'active' depende del estado 'activeIndex'
                className={idx === activeIndex ? 'active' : ''}
                // 'aria-current' también depende del estado
                aria-current={idx === activeIndex ? 'true' : undefined}
                aria-label={slide.title} // Usamos el título para el label
              ></button>
            ))}
          </div>

          {/* MODIFICADO: Slides generados dinámicamente */}
          <div className="carousel-inner">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                // La clase 'active' depende del estado 'activeIndex'
                className={`carousel-item ${idx === activeIndex ? 'active' : ''}`}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${idx + 1} de ${heroSlides.length}`}
              >
                <div className="hero-slide">
                  <img
                    src={slide.img}
                    className="hero-slide-image"
                    alt={slide.alt}
                  />
                  <div className="hero-overlay">
                    <div className="hero-content-center">
                      <h2 className="hero-main-title">{slide.title}</h2>
                      <p className="hero-main-subtitle">{slide.subtitle}</p>
                      {/* Renderizado condicional del botón */}
                      {slide.isReactLink ? (
                        <Link to={slide.link} className="btn-hero-primary" aria-label={slide.linkLabel}>
                          {slide.linkLabel}
                        </Link>
                      ) : (
                        <a href={slide.link} className="btn-hero-primary">
                          {slide.linkLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles (estos se quedan igual) */}
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

      {/* SOBRE NOSOTROS*/}
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
                <Link to="/contacto" className="btn-secondary-custom" aria-label="Contactar a Hermanos Jota"> Contactanos </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT: Sustentabilidad*/}
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
                    <ProductCardGrid product={p} onAdd={onAdd} />
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
                        <ProductCardGrid product={p} onAdd={onAdd}/>
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

          <div className="text-center mt-4">
          <Link to="/productos" className="btn-secondary-custom mt-3 mb-5" aria-label="Ver todo el catálogo"> Ver todo el catálogo </Link>
          </div>

        </div>
      </section>
    </>
  );
}