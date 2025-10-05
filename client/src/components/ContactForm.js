import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [ok, setOk] = useState(false);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Contacto:', form);
    setOk(true);
  };

  return React.createElement(
    'div',
    { className: 'container my-3' },
    React.createElement('h3', { className: 'mb-3' }, 'Contacto'),
    ok && React.createElement('div', { className: 'alert alert-success' }, '¡Mensaje enviado con éxito!'),
    React.createElement(
      'form',
      { className: 'row g-3', onSubmit },
      React.createElement(
        'div',
        { className: 'col-12 col-md-6' },
        React.createElement('label', { className: 'form-label' }, 'Nombre'),
        React.createElement('input', {
          className: 'form-control',
          name: 'nombre',
          value: form.nombre,
          onChange
        })
      ),
      React.createElement(
        'div',
        { className: 'col-12 col-md-6' },
        React.createElement('label', { className: 'form-label' }, 'Email'),
        React.createElement('input', {
          className: 'form-control',
          type: 'email',
          name: 'email',
          value: form.email,
          onChange
        })
      ),
      React.createElement(
        'div',
        { className: 'col-12' },
        React.createElement('label', { className: 'form-label' }, 'Mensaje'),
        React.createElement('textarea', {
          className: 'form-control',
          name: 'mensaje',
          rows: 4,
          value: form.mensaje,
          onChange
        })
      ),
      React.createElement(
        'div',
        { className: 'col-12' },
        React.createElement('button', { className: 'btn btn-primary' }, 'Enviar')
      )
    )
  );
}

