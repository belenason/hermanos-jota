import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' }); // Almacena los valores de los campos del formulario
  const [ok, setOk] = useState(false); // Controla el cartel de éxito
  const [validated, setValidated] = useState(false); // Indica si el formulario ha sido validado (para mostrar errores)


  function handleChange(e){
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formElement = e.currentTarget;
    if (!formElement.checkValidity()) { // checkValidity es una función nativa de HTML5 que valida los campos según sus atributos
      e.stopPropagation(); // Detiene la propagación del evento hacia elementos padres
      setValidated(true); // Muestra mensajes de error
      return;
    }

    console.log('Formulario:', form);
    setOk(true); // Muestra el cartel de éxito
    setValidated(false);

    setForm({ nombre: '', email: '', mensaje: '' }); //Limpia el formulario
  };
 
  return (
    <>
      <form 
        id="contact-form" 
        className={`needs-validation ${validated ? 'was-validated' : ''}`} 
        noValidate 
        onSubmit={handleSubmit}
      >
        {/* CAMPO NOMBRE */}
        <div className="form-floating mb-4">
          <input 
            type="text" 
            className="form-control" 
            id="nombre" 
            placeholder="Tu nombre completo"
            required
            name="nombre"
            autoComplete="name"
            aria-describedby="error-nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <label htmlFor="nombre">Nombre completo</label>
          <div className="invalid-feedback" id="error-nombre">
            Por favor ingresa tu nombre completo.
          </div>
        </div>

        {/* CAMPO EMAIL */}
        <div className="form-floating mb-4">
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="tu@email.com"
            required
            name="email"
            autoComplete="email"
            aria-describedby="error-email"
            value={form.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Correo electrónico</label>
          <div className="invalid-feedback" id="error-email">
            Por favor ingresa un email válido.
          </div>
        </div>

        {/* CAMPO MENSAJE */}
        <div className="form-floating mb-4">
          <textarea 
            className="form-control" 
            id="mensaje" 
            placeholder="Cuéntanos sobre tu proyecto..."
            required
            name="mensaje"
            autoComplete="off"
            aria-describedby="error-mensaje"
            value={form.mensaje}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="mensaje">Tu mensaje</label>
          <div className="invalid-feedback" id="error-mensaje">
            Por favor compártenos tu mensaje o consulta.
          </div>
        </div>

        {/* BOTÓN DE ENVÍO */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-send me-2" aria-hidden="true"></i>
            Enviar mensaje
          </button>
        </div>
      </form>

      {/* MENSAJE DE ÉXITO */}
      {ok && (
        <div id="success-message" className="success-message mt-4" role="alert" aria-live="assertive">
          <div className="alert-content">
            <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
            <p>
              <strong>¡Mensaje enviado con éxito!</strong><br />
              Gracias por contactarnos. Te responderemos a la brevedad.
            </p>
          </div>
        </div>
      )}
    </>
  );
}