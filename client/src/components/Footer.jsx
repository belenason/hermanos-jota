export default function Footer() {
  return (
    <footer className=" modern-footer" id="contacto">
      <div className="container">
        <section className="footer-content">
          <div className="row g-5">
            {/* MARCA Y DESCRIPCIÓN */}
            <section className="col-lg-4 footer-brand">
              <h2 className="footer-title">Hermanos Jota</h2>
              <p className="footer-description">
                Cada pieza cuenta la historia de manos expertas y materiales nobles. Creamos muebles que no solo sirven una función, sino que alimentan el alma y perduran generaciones.
              </p>
              <nav className="footer-social" aria-label="Redes sociales de Hermanos Jota">
                <a 
                  href="https://instagram.com/hermanosjota_ba" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link" 
                  aria-label="Instagram de Hermanos Jota"
                >
                  <i className="bi bi-instagram" aria-hidden="true"></i>
                </a>
                <a 
                  href="https://wa.me/541145678900" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link" 
                  aria-label="WhatsApp de Hermanos Jota"
                >
                  <i className="bi bi-whatsapp" aria-hidden="true"></i>
                </a>
                <a 
                  href="mailto:info@hermanosjota.com.ar" 
                  className="social-link" 
                  aria-label="Enviar correo a Hermanos Jota"
                >
                  <i className="bi bi-envelope" aria-hidden="true"></i>
                </a>
              </nav>
            </section>
            
            {/* INFORMACIÓN DE CONTACTO */}
            <address className="col-lg-4 footer-info">
              <h3 className="footer-heading">Showroom & Taller</h3>
              <div className="contact-item">
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                <p>
                    <strong>Av. San Juan 2847</strong><br />
                    C1232AAB — Barrio de San Cristóbal<br />
                    Ciudad Autónoma de Buenos Aires, Argentina
                </p>
              </div>
              <div className="contact-item">
                <i className="bi bi-clock" aria-hidden="true"></i>
                <p className="mb-0">
                  <strong>Horarios</strong><br />
                  Lun - Vie: 10:00 - 19:00<br />
                  Sáb: 10:00 - 14:00
                </p>
              </div>
            </address>
            
            {/* DATOS DE CONTACTO */}
            <section className="col-lg-4 footer-contact">
              <h3 className="footer-heading">Contacto</h3>
                <div className="contact-item">
                  <i className="bi bi-phone" aria-hidden="true"></i>
                  <a href="tel:+541145678900">
                    +54 11 4567-8900
                  </a>
                </div>
                <div className="contact-item">
                  <i className="bi bi-envelope" aria-hidden="true"></i>
                  <a href="mailto:info@hermanosjota.com.ar">
                    info@hermanosjota.com.ar
                  </a>
                </div>
                <div className="contact-item">
                  <i className="bi bi-globe" aria-hidden="true"></i>
                  <a href="https://hermanos-jota.vercel.app">
                    www.hermanos-jota.vercel.app
                  </a>
                </div>
            </section>
          </div>
        </section>
        
        {/* SECCIÓN INFERIOR DEL FOOTER */}
        <section className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="copyright">
                © {new Date().getFullYear()} Hermanos Jota. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <p className="credits">
                Diseñado con <i className="bi bi-heart-fill" aria-hidden="true"></i>
                <span className="visually-hidden">amor</span> para curso ITBA
              </p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}