/**
 * Componente ProductCard
 * Tarjeta individual de producto para mostrar en el catálogo
 */
import React from 'react';
import '../styles/components/ProductCard.css';

const ProductCard = ({ producto, onProductClick, onAddToCart }) => {
  const handleViewDetails = () => {
    if (onProductClick) {
      onProductClick(producto);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evitar que se active el click del producto
    if (onAddToCart) {
      onAddToCart(producto);
    }
  };

  // Formatear precio
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Consultar precio';
    return `$${Number(price).toLocaleString('es-AR')}`;
  };

  // Obtener primera imagen o imagen por defecto
  const getImageUrl = () => {
    if (producto.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes[0];
    }
    return '/img/producto-ejemplo.jpg';
  };

  return (
    <article className="product-card">
      <div className="product-card-image" onClick={handleViewDetails}>
        <img 
          src={getImageUrl()} 
          alt={producto.nombre}
          loading="lazy"
        />
      </div>
      
      <div className="product-card-content">
        <h3 className="product-card-title" onClick={handleViewDetails}>
          {producto.nombre}
        </h3>
        
        {producto.descripcion && (
          <p className="product-card-description">
            {producto.descripcion.substring(0, 100)}
            {producto.descripcion.length > 100 ? '...' : ''}
          </p>
        )}
        
        <div className="product-card-footer">
          <span className="product-card-price">
            {formatPrice(producto.precio)}
          </span>
          
          <div className="product-card-actions">
            <button 
              className="btn-view-details"
              onClick={handleViewDetails}
              aria-label={`Ver detalles de ${producto.nombre}`}
            >
              Ver detalles
            </button>
            
            <button 
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              aria-label={`Agregar ${producto.nombre} al carrito`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
