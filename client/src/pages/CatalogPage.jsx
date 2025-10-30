import { useState } from 'react';
import ProductCardGrid from '../components/ProductCardGrid';

export default function CatalogPage({
  products = [],
  loading,
  error,
  onRetry,
  onAdd
}) {
  const [buscado, setQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const query = buscado.toLowerCase().trim();
    if (!query) return true;
    const words = (p.nombre || '').toLowerCase().split(' ');
    return words.some(word => word.startsWith(query));
  });

  // ---- Estado: cargando ----
  if (loading) {
    return (
      <div className="catalog-loading text-center">
        <div className="spinner-border text-siena mb-3" role="status" />
        <p className="loading-text">Cargando productos…</p>
      </div>
    );
  }

  // ---- Estado: error ----
  if (error) {
    return (
      <div className="catalog-error text-center">
        <div className="error-card">
          <h5 className="error-title">Ocurrió un error</h5>
          <p className="error-message">Lamentamos los problemas. Estamos trabajando para mejorar tu experiencia.</p>
          <button className="btn-secondary-custom" onClick={onRetry} disabled={loading}>
            {loading ? 'Reintentando…' : 'Reintentar'}
          </button>
        </div>
      </div>
    );
  }

  // ---- Sin productos ----
  if (!products.length) {
    return (
      <div className="catalog-empty">
        <div className="empty-content">
          <div className="empty-icon">🪑</div>
          <h5 className="empty-title">No hay productos disponibles</h5>
          <p className="empty-text">
            Vuelve más tarde o revisá nuevamente nuestra selección.
          </p>
        </div>
      </div>
    );
  }

  // ---- Vista normal ----
  return (
    <>
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Nuestros Productos</h2>
          <p className="hero-subtitle">
            Descubrí nuestra selección de muebles, diseñados para transformar tu espacio.
          </p>

          <input type="text" className="form-control my-3" placeholder="Buscar producto..." value={buscado} onChange={e => setQuery(e.target.value)}/>
        </div>
      </section>

      <section className="grilla mb-4" id="catalog-grid">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="text-muted">No se encontraron productos</h3>
            <p>Probá con otros términos de búsqueda.</p>
          </div>
        ) : (
          filteredProducts.map((p) => (
            <ProductCardGrid
              key={p.id ?? p.nombre}
              product={p}
              onAdd={onAdd}
            />
          ))
        )}
      </section>
    </>
  );
}
