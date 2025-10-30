// src/components/ProductForm.jsx
import { useState } from 'react';

export default function ProductForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagenUrl: ''});
  const [validated, setValidated] = useState(false);

  function handleChange(e){
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formElement = e.currentTarget;
    if (!formElement.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      ...form,
      precio: Number(form.precio || 0),
      stock: Number(form.stock || 0),
    };

    onSubmit(payload);
    setValidated(false);
  };

  return (
    <form 
      id="product-form"
      className={`needs-validation ${validated ? 'was-validated' : ''}`}
      noValidate
      onSubmit={handleSubmit}
    >
      {/* CAMPO NOMBRE */}
      <div className="form-floating mb-4">
        <input
          type="text"
          className="form-control"
          id="nombre"
          placeholder="Nombre del producto"
          required
          name="nombre"
          aria-describedby="error-nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <label htmlFor="nombre">Nombre del producto</label>
        <div className="invalid-feedback" id="error-nombre">
          Por favor ingresa el nombre del producto.
        </div>
      </div>

      {/* CAMPO DESCRIPCIÓN */}
      <div className="form-floating mb-4">
        <textarea
          className="form-control"
          id="descripcion"
          placeholder="Descripción del producto"
          name="descripcion"
          aria-describedby="error-descripcion"
          style={{ height: '120px' }}
          value={form.descripcion}
          onChange={handleChange}
        />
        <label htmlFor="descripcion">Descripción</label>
      </div>

      {/* CAMPOS PRECIO Y STOCK */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="precio"
              placeholder="Precio"
              required
              name="precio"
              min="0"
              step="0.01"
              aria-describedby="error-precio"
              value={form.precio}
              onChange={handleChange}
            />
            <label htmlFor="precio">Precio</label>
            <div className="invalid-feedback" id="error-precio">
              Por favor ingresa un precio válido.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="stock"
              placeholder="Stock"
              name="stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
            />
            <label htmlFor="stock">Stock disponible</label>
          </div>
        </div>
      </div>

      {/* CAMPO URL IMAGEN */}
      <div className="form-floating mb-4">
        <input
          type="url"
          className="form-control"
          id="imagenUrl"
          placeholder="https://ejemplo.com/imagen.jpg"
          name="imagenUrl"
          aria-describedby="error-imagenUrl"
          value={form.imagenUrl}
          onChange={handleChange}
        />
        <label htmlFor="imagenUrl">URL de la imagen</label>
        <div className="invalid-feedback" id="error-imagenUrl">
          Por favor ingresa una URL válida.
        </div>
      </div>

      {/* BOTONES */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-check-circle me-2" aria-hidden="true"></i>
          Crear Producto
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}