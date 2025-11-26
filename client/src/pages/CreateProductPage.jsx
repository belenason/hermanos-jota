// src/pages/CreateProductPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from '../apiProductos';
import { toast } from 'react-hot-toast'

import ProductForm from '../components/ProductForm';

export default function CreateProductPage({ onDataMutated}) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, []); 

  const handleSubmit = async (formData) => {
    setError('');
    setSaving(true);
    try {
      const created = await createProducto(formData);

      onDataMutated();

      // Toast de confirmación
      toast.success('¡Producto creado con éxito!');

      navigate(`/productos/${created.id}`, { replace: true });
    } catch (err) {
      setError('No se pudo crear el producto');
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
        <div className="contact-form-wrapper-general">
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
          ) : (
            <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
          )}
        </div>
      </section>

    </>
  );
}
