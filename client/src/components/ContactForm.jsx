/**
 * Componente ContactForm
 * Formulario de contacto controlado
 */
import React, { useState } from 'react';
import '../styles/components/ContactForm.css';

const ContactForm = () => {
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (!validateForm()) {
      return;
    }

    // Crear objeto con los datos
    const formData = {
      nombre,
      email,
      telefono,
      mensaje,
      fecha: new Date().toISOString()
    };

    // Log de los datos (en producción esto se enviaría a un backend)
    console.log('📧 Formulario de contacto enviado:', formData);

    // Mostrar mensaje de éxito
    setSubmitted(true);

    // Limpiar formulario
    setNombre('');
    setEmail('');
    setTelefono('');
    setMensaje('');
    setErrors({});

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">Contáctanos</h2>
      <p className="contact-form-subtitle">
        ¿Tienes alguna pregunta? Completa el formulario y te responderemos a la brevedad.
      </p>

      {submitted && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">¡Mensaje enviado!</h4>
          <p>Gracias por contactarnos. Te responderemos pronto.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre completo <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Juan Pérez"
            required
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre}</div>
          )}
        </div>

        {/* Campo Email */}
        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan@ejemplo.com"
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Campo Teléfono (opcional) */}
        <div className="form-group">
          <label htmlFor="telefono">Teléfono (opcional)</label>
          <input
            type="tel"
            id="telefono"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+54 9 11 1234-5678"
          />
        </div>

        {/* Campo Mensaje */}
        <div className="form-group">
          <label htmlFor="mensaje">
            Mensaje <span className="required">*</span>
          </label>
          <textarea
            id="mensaje"
            className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            rows="5"
            required
          ></textarea>
          {errors.mensaje && (
            <div className="invalid-feedback">{errors.mensaje}</div>
          )}
        </div>

        {/* Botón de envío */}
        <button type="submit" className="btn-submit">
          Enviar mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
