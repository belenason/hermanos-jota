import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      {/* SECCIÓN HERO DE CONTACTO */}
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Conversemos</h2>
          <p className="hero-subtitle">
            Nos encanta escuchar sobre tus proyectos. Contanos tu visión y juntos 
            creemos el mueble perfecto para tu espacio.
          </p>
        </div>
      </section>

      {/* SECCIÓN DEL FORMULARIO DE CONTACTO */}
      <section className="contact-container">
        <div className="contact-form-wrapper">
          <ContactForm />
        </div>
      </section>
    </>
  );
}