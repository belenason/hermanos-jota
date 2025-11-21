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

          {/* STEP INDICATOR */}
          <div className="register-stepper">
            <div className="step-line">
              <div className="step-node step-node-active">
                <span className="step-dot" />
                <span className="step-label">Paso 1</span>
              </div>

              <div className="step-connector" />

              <div className="step-node">
                <span className="step-dot" />
                <span className="step-label">Paso 2</span>
              </div>

              <div className="step-connector" />

              <div className="step-node">
                <span className="step-dot" />
                <span className="step-label">Paso 3</span>
              </div>
            </div>
          </div>

          {/* TITULO */}
          <header className="register-header text-center">
            <h1 className="register-title">Crear cuenta</h1>
            <p className="register-subtitle">
              Empezá a disfrutar de tus muebles favoritos guardando tus datos.
            </p>
          </header>

          {/* FORMULARIO IMPORTADO */}
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
