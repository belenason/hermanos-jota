// src/pages/LoginPage.jsx
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="register-page">
      <div className="register-overlay" />

      <div className="register-shell container">
        <div className="register-card">

          {/* Título */}
          <header className="register-header text-center">
            <h1 className="register-title">Iniciar sesión</h1>
            <p className="register-subtitle">
              Ingresá tus datos para ver el catálogo y tu carrito guardado.
            </p>
          </header>

          {/* Formulario de login */}
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
