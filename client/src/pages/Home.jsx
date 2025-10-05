import ProductCard from '../components/ProductCard';

export default function Home({ onGoCatalog, featuredProducts = [] }) {
  return (
    <>
      {/* HERO con carrusel (usa imágenes que ya tenés en /public/img) */}
      <section className="hero-carousel-section" aria-label="Presentación principal">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" role="region" aria-roledescription="carrusel">
          {/* Indicadores */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Diapositiva 1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Diapositiva 2"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Diapositiva 3"></button>
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/fondohero.jpg" className="d-block w-100" alt="Ambiente con mobiliario de madera de Hermanos Jota" />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="section-title">Muebles con alma</h2>
                <p>Diseño honesto y materiales nobles para toda la vida.</p>
                <button className="btn btn-primary" onClick={onGoCatalog}>Ver catálogo</button>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/img/ImagenHero1.png" className="d-block w-100" alt="Detalle de texturas y terminaciones artesanales" />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="section-title">Artesanía + precisión</h2>
                <p>Unimos lo mejor del oficio con procesos modernos.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/img/ImagenHero2.png" className="d-block w-100" alt="Showroom de Hermanos Jota" />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="section-title">Showroom Buenos Aires</h2>
                <p>Vení a ver, tocar y elegir tu próxima pieza favorita.</p>
              </div>
            </div>
          </div>

          {/* Controles */}
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" aria-label="Anterior">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" aria-label="Siguiente">
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
                <button className="btn btn-outline-primary" onClick={onGoCatalog}>Conocé nuestros productos</button>
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
                  Trabajamos con madera certificada FSC® y acabados al aceite natural. Buscamos procesos responsables y
                  trazables, priorizando maderas nativas.
                </p>
                <ul className="sustainability-stats list-unstyled d-flex gap-4">
                  <li className="stat-item">
                    <p className="stat-number m-0">30%</p>
                    <p className="stat-label m-0">Materiales reciclados</p>
                  </li>
                  <li className="stat-item">
                    <p className="stat-number m-0">100%</p>
                    <p className="stat-label m-0">Acabados naturales</p>
                  </li>
                </ul>
                <a href="#contacto" className="btn btn-secondary mt-3">Programa Herencia Viva</a>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="split-image-container position-relative">
                <img src="/img/mesa_de_noche_aconcagua.png" alt="Mesa de noche Aconcagua" className="split-image w-100 h-100 object-fit-cover" />
                <div className="image-overlay position-absolute top-0 start-0 p-3">
                  <span className="image-label badge bg-dark">MADERA CERTIFICADA FSC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS (usa tu <ProductCard>) */}
      <section id="productos" className="products-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Productos Destacados</h2>

          {featuredProducts.length > 0 ? (
            <div className="row g-4">
              {featuredProducts.slice(0, 8).map(p => (
                <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                  <ProductCard product={p} onClick={() => {/* manejalo desde App si querés: seleccionar y cambiar de vista */}} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-3">Pronto verás aquí una selección de nuestras piezas favoritas.</p>
              <button className="btn btn-primary" onClick={onGoCatalog}>
                Ver todo el catálogo
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
