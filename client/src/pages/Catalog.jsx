// src/pages/Catalog.jsx
import { useState } from 'react';
import ProductCardGrid from '../components/ProductCardGrid';

export default function Catalog({
  products = [],
  loading,
  error,
  onSelect,
  onRetry,
  onAdd
}) {
  const [buscado, setQuery] = useState('');
  
  const filteredProducts = products.filter(p => {
    const query = buscado.toLowerCase().trim();
    if (!query) return true;
    
    const words = p.nombre.toLowerCase().split(' ');
    return words.some(word => word.startsWith(query));
  });

  if (loading) return <p className="text-center my-5">Cargando productos…</p>;

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={onRetry}>Reintentar</button>
      </div>
    );
  }

  if (!products.length) {
    return <p className="text-center my-5">No hay productos.</p>;
  }

  return (
    <>
      {/* Hero simple (opcional) */}
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Nuestros Productos</h2>
          <p className="hero-subtitle">
            Descubrí nuestra selección de muebles, diseñados para transformar tu espacio.
          </p>
          
          {/* Barra de búsqueda del segundo código */}
          <input
            type="text"
            className="form-control my-3"
            placeholder="Buscar producto..."
            value={buscado}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Grilla responsiva estilo productos.html */}
      <section className="grilla mb-4" id="catalog-grid">
        {filteredProducts.length === 0 ? (
          <div className="full-width-message">
            <h3 className="text-muted">No se encontraron productos</h3>
            <p>Probá con otros términos de búsqueda</p>
          </div>
        ) : (
          filteredProducts.map((p) => (
            <ProductCardGrid
              key={p.id ?? p.nombre}
              product={p}
              onOpen={() => onSelect(p)}
              onAdd={onAdd}
            />
          ))
        )}
      </section>
    </>
  );
}