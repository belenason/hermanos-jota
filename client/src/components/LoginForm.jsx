// src/components/LoginForm.jsx
import { useState, useContext } from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import { loginUsuario } from '../apiUsuarios';

import { AuthContext } from '../auth/AuthContext';

export default function LoginForm() {
  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    // Validación nativa del navegador + Bootstrap
    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const data = await loginUsuario({
        email: form.email.trim(),
        password: form.password,
      });

      login(data);

      setSuccessMsg('Inicio de sesión exitoso. Redirigiendo…');

      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo iniciar sesión.');
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
        <div className="alert alert-danger py-2 px-3 mb-3" role="alert">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success py-2 px-3 mb-3" role="alert">
          {successMsg}
        </div>
      )}

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
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña</label>
        <div className="invalid-feedback">Ingresá tu contraseña.</div>
      </div>

      {/* Botón */}
      <div className="d-grid mb-2">
        <button type="submit" className="btn btn-register" disabled={loading}>
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </div>

      <p className="register-terms text-center">
        ¿No tenés cuenta? Podés crearla en pocos segundos. <Link to="/registro">Registrate</Link>
      </p>
    </form>
  );
}
