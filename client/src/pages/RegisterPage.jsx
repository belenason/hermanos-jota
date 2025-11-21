// src/pages/RegisterPage.jsx
import { useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="register-page">
      <div className="register-overlay" />

      <div className="register-shell container">
        <div className="register-card">

          {/* TÍTULO */}
          <header className="register-header text-center">
            <h1 className="register-title">Crear cuenta</h1>
            <p className="register-subtitle">
              Un solo paso, todo listo para usar tu catálogo.
            </p>
          </header>

          {/* FORMULARIO */}
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
