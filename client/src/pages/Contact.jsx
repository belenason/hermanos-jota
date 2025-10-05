import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      {/* HERO de contacto */}
      <section className="contact-hero text-center py-5">
        <div className="contact-container container">
          <h2 className="hero-title mb-3">Conversemos</h2>
          <p className="hero-subtitle lead m-auto" style={{ maxWidth: 720 }}>
            Nos encanta escuchar sobre tus proyectos. Contanos tu visión y juntos creemos el mueble perfecto para tu espacio.
          </p>
        </div>
      </section>

      {/* FORMULARIO + INFO */}
      <section id="contacto" className="contact-container py-4">
        <div className="container">
          <div className="row g-5">
            {/* Formulario controlado (useState + console.log dentro del componente) */}
            <div className="col-lg-8">
              <div className="contact-form-wrapper p-3 p-md-4 rounded shadow-sm bg-white">
                <h3 className="mb-4">Escribinos</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
