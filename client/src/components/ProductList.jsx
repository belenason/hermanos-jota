/**
 * Componente ProductList
 * Lista/grilla de productos del catálogo
 */
import React from 'react';
import ProductCard from './ProductCard';
import '../styles/components/ProductList.css';

const ProductList = ({ productos, loading, error, onProductClick, onAddToCart }) => {
  // Estado de carga
  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="product-list-error">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error al cargar productos</h4>
          <p>{error}</p>
          <hr />
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Sin productos
  if (!productos || productos.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="alert alert-info" role="alert">
          <h4>No se encontraron productos</h4>
          <p>Intenta con otros términos de búsqueda o vuelve más tarde.</p>
        </div>
      </div>
    );
  }

  // Lista de productos
  return (
    <div className="product-list">
      <div className="product-grid">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onProductClick={onProductClick}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
