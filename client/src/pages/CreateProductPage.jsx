// src/pages/CreateProductPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from '../api';
import ProductForm from '../components/ProductForm';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setError('');
    setSaving(true);
    try {
      const created = await createProducto(formData);
      setSuccess(true);
      
      // Redirigir después de un breve delay para mostrar el mensaje
      setTimeout(() => {
        navigate(`/productos/${created.id}`, { replace: true });
      }, 1500);
    } catch (err) {
      setError(err?.message ?? 'No se pudo crear el producto');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/productos');
  };

  return (
    <>
      {/* SECCIÓN HERO */}
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Nuevo Producto</h2>
          <p className="hero-subtitle">
            Agregá un nuevo mueble al catálogo. Completá los detalles y 
            hacelo disponible para tus clientes.
          </p>
        </div>
      </section>

      {/* SECCIÓN DEL FORMULARIO */}
      <section className="contact-container">
        <div className="contact-form-wrapper">
          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {saving ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Guardando...</span>
              </div>
              <p className="mt-3">Guardando producto...</p>
            </div>
          ) : success ? (
            <div className="success-message" role="alert" aria-live="assertive">
              <div className="alert-content">
                <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                <p>
                  <strong>¡Producto creado con éxito!</strong><br />
                  Redirigiendo al producto...
                </p>
              </div>
            </div>
          ) : (
            <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
          )}
        </div>
      </section>
    </>
  );
}