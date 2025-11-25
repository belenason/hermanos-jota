// src/components/LoginForm.jsx
import { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUsuario } from '../apiUsuarios';
import { AuthContext } from '../auth/AuthContext';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');      // Error general (API, credenciales, etc.)
  const [successMsg, setSuccessMsg] = useState('');
  const [emailError, setEmailError] = useState('');  // Error específico de email
  const [passwordError, setPasswordError] = useState(''); // Error específico de password

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpio errores del campo a medida que escribe
    if (name === 'email' && emailError) setEmailError('');
    if (name === 'password' && passwordError) setPasswordError('');
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reseteo errores
    setEmailError('');
    setPasswordError('');
    setErrorMsg('');
    setSuccessMsg('');

    const trimmedEmail = form.email.trim();
    const trimmedPassword = form.password.trim();
    let hasError = false;

    // Validación de email
    if (!trimmedEmail) {
      setEmailError('Ingresá tu correo electrónico.');
      hasError = true;
    } else {
      // Validar formato básico de email
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setEmailError('Ingresá un correo con formato válido.');
        hasError = true;
      }
    }

    // Validación de password
    if (!trimmedPassword) {
      setPasswordError('Ingresá tu contraseña.');
      hasError = true;
    }

    if (hasError) return; // No llamamos a la API si ya sabemos que hay errores de formulario

    setLoading(true);

    try {
      const data = await loginUsuario({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      login(data);

      setSuccessMsg('Inicio de sesión exitoso.');

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 200);
    } catch (err) {
      // Error del backend (credenciales inválidas, etc.)
      setErrorMsg(err.message || 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" noValidate onSubmit={handleSubmit}>
      {/* Mensaje general (API / credenciales) */}
      {errorMsg && (
        <p className="login-msg login-error mb-3">{errorMsg}</p>
      )}

      {successMsg && (
        <p className="login-msg login-success mb-3">{successMsg}</p>
      )}

      {/* Email */}
      <div className="form-floating mb-2">
        <input
          type="email"
          id="email"
          name="email"
          className="form-control register-input"
          placeholder="email@mail.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="email">Correo electrónico</label>
      </div>
      {emailError && (
        <p className="login-error mb-3">{emailError}</p>
      )}

      {/* Password */}
      <div className="form-floating mb-2">
        <input
          type="password"
          id="password"
          name="password"
          className="form-control register-input"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña</label>
      </div>
      {passwordError && (
        <p className="login-error mb-3">{passwordError}</p>
      )}

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
