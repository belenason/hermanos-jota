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
    { style: { border: '1px solid #eee', borderRadius: 8, padding: 16 } },
    React.createElement('h3', null, 'Contacto'),
    ok && React.createElement('p', { style: { color: 'green' } }, '¡Mensaje enviado con éxito!'),
    React.createElement(
      'form',
      { onSubmit },
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('label', null, 'Nombre'),
        React.createElement('input', { name: 'nombre', value: form.nombre, onChange, style: { width: '100%' } })
      ),
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('label', null, 'Email'),
        React.createElement('input', { name: 'email', type: 'email', value: form.email, onChange, style: { width: '100%' } })
      ),
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('label', null, 'Mensaje'),
        React.createElement('textarea', { name: 'mensaje', value: form.mensaje, onChange, rows: 4, style: { width: '100%' } })
      ),
      React.createElement('button', { type: 'submit' }, 'Enviar')
    )
  );
}
