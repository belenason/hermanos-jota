// src/components/RegisterForm.jsx
import { useState } from 'react';
import { registrarUsuario } from '../apiUsuarios';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: ''});
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  function handleChange(e){
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formEl = e.currentTarget;

    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await registrarUsuario({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setSuccessMsg('Cuenta creada con éxito. Redirigiendo…');
      setForm({ username: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`needs-validation register-form ${validated ? 'was-validated' : ''}`}
      noValidate
      onSubmit={handleSubmit}
    >
      {/* Mensajes */}
      {errorMsg && (
         <p className="login-msg login-error mb-3">{errorMsg}</p>
      )}

      {successMsg && (
        <p className="login-msg login-success mb-3">{successMsg}</p>
      )}

      {/* Username */}
      <div className="form-floating mb-3">
        <input
          type="text"
          id="username"
          name="username"
          className="form-control register-input"
          placeholder="Nombre de usuario"
          required
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
        />
        <label htmlFor="username">Nombre de usuario</label>
        <div className="invalid-feedback">Ingresá un nombre de usuario.</div>
      </div>

      {/* Email */}
      <div className="form-floating mb-3">
        <input
          type="email"
          id="email"
          name="email"
          className="form-control register-input"
          placeholder="email@mail.com"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="email">Correo electrónico</label>
        <div className="invalid-feedback">Ingresá un correo válido.</div>
      </div>

      {/* Password */}
      <div className="form-floating mb-4">
        <input
          type="password"
          id="password"
          name="password"
          className="form-control register-input"
          placeholder="Contraseña"
          required
          minLength={8}
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña</label>
        <div className="invalid-feedback">Mínimo 8 caracteres.</div>
      </div>

      {/* Botón */}
      <div className="d-grid mb-2">
        <button type="submit" className="btn btn-register" disabled={loading}>
          {loading ? 'Creando cuenta…' : 'Continuar'}
        </button>
      </div>

      <p className="register-terms text-center">
        Al continuar, aceptás nuestros términos y condiciones.
      </p>
      <p className="register-terms text-center">
        ¿Ya tenes cuenta? <Link to="/login">Ingresa</Link>
      </p>
    </form>
  );
}
