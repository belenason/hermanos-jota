// src/pages/EditProductPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductoById, updateProducto } from '../api';
import ProductForm from '../components/ProductForm';
import Toast from '../components/Toast';

export default function EditProductPage( {onDataMutated} ) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);

  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (message) => setToast({ show: true, message });
  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  // Cargar el producto existente
  useEffect(() => {
    (async () => {
      try {
        setError('');
        setLoading(true);
        const p = await getProductoById(id);
        setProduct({ ...p, id: p._id || p.id });
      } catch (e) {
        setError(e?.message ?? 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      // IMPORTANTE: aseguramos enviar el id correcto (_id en backend)
      await updateProducto(product._id || product.id, formData);
      onDataMutated();
      showToast('¡Cambios guardados!');
      // redirige al detalle
      setTimeout(() => {
        navigate(`/productos/${product._id || product.id}`, { replace: true });
      }, 2000);
    } catch (e) {
      setError(e?.message ?? 'No se pudieron guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/productos/${product?._id || product?.id || id}`);
  };

  if (loading) {
    return (
      <section className="contact-container">
        <div className="text-center py-5">
          <div className="spinner-border text-siena" role="status" />
          <p className="mt-3">Cargando producto…</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="contact-container">
        <div className="contact-form-wrapper-general text-center">
          <h3 className="mb-3">Ocurrió un problema</h3>
          <p className="text-muted mb-4">{error || 'Producto no encontrado'}</p>
          <Link to="/productos" className="btn-secondary-custom">Volver al catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Editar producto</h2>
          <p className="hero-subtitle">Modificá la información y guardá los cambios.</p>
        </div>
      </section>

      {/* FORM */}
      <section className="contact-container">
        <div className="contact-form-wrapper-general">
          {saving ? (
            <div className="text-center py-5">
              <div className="spinner-border text-siena" role="status" />
              <p className="mt-3">Guardando cambios…</p>
            </div>
          ) : (
            <ProductForm
              initialValues={product}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitLabel="Guardar cambios"
            />
          )}
        </div>
      </section>

      <Toast show={toast.show} message={toast.message} onClose={hideToast} duration={1200} />
    </>
  );
}
