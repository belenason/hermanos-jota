// src/pages/CreateProductPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from '../api';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        precio: Number(form.precio || 0),
        stock: Number(form.stock || 0),
      };
      const created = await createProducto(payload);
      // Redirigir al detalle del nuevo producto
      navigate(`/productos/${created._id || created.id}`);
    } catch (err) {
      setError(err?.message ?? 'No se pudo crear el producto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: 720 }}>
      <h2 className="mb-4">Crear producto</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-floating mb-3">
          <input
            name="nombre"
            id="nombre"
            className="form-control"
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={handleChange}
          />
          <label htmlFor="nombre">Nombre *</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            name="descripcion"
            id="descripcion"
            className="form-control"
            placeholder="Descripción"
            style={{ height: 120 }}
            value={form.descripcion}
            onChange={handleChange}
          />
          <label htmlFor="descripcion">Descripción</label>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="number"
                name="precio"
                id="precio"
                className="form-control"
                placeholder="Precio"
                required
                min="0"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
              />
              <label htmlFor="precio">Precio *</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="number"
                name="stock"
                id="stock"
                className="form-control"
                placeholder="Stock"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
              />
              <label htmlFor="stock">Stock</label>
            </div>
          </div>
        </div>

        <div className="form-floating my-3">
          <input
            name="imagenUrl"
            id="imagenUrl"
            className="form-control"
            placeholder="https://…"
            value={form.imagenUrl}
            onChange={handleChange}
          />
          <label htmlFor="imagenUrl">URL de imagen</label>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Guardando…' : 'Crear'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/productos')}
            disabled={saving}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
