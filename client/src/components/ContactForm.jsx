import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:'' });
  const [ok, setOk] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario:', form); // pedido por consigna
    setOk(true);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-floating mb-3">
        <input className="form-control" id="nombre" placeholder="Tu nombre" required
               value={form.nombre} onChange={e=>setForm(f=>({...f, nombre: e.target.value}))}/>
        <label htmlFor="nombre">Nombre completo</label>
      </div>
      <div className="form-floating mb-3">
        <input type="email" className="form-control" id="email" placeholder="tu@email.com" required
               value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))}/>
        <label htmlFor="email">Correo electrónico</label>
      </div>
      <div className="form-floating mb-3">
        <textarea className="form-control" id="mensaje" placeholder="Tu mensaje" required
                  value={form.mensaje} onChange={e=>setForm(f=>({...f, mensaje: e.target.value}))}/>
        <label htmlFor="mensaje">Tu mensaje</label>
      </div>
      <button className="btn btn-primary" type="submit">
        <i className="bi bi-send me-2"></i>Enviar mensaje
      </button>

      {ok && (
        <div className="alert alert-success mt-3">
          ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
        </div>
      )}
    </form>
  );
}
