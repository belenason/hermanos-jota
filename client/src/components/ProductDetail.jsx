/**
 * Componente ProductDetail
 * Vista detallada de un producto individual
 */
import React, { useState } from 'react';
import '../styles/components/ProductDetail.css';

const ProductDetail = ({ producto, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!producto) {
    return (
      <div className="product-detail-error">
        <div className="alert alert-warning">
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <button className="btn btn-primary" onClick={onBack}>
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  // Formatear precio
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Consultar precio';
    return `$${Number(price).toLocaleString('es-AR')}`;
  };

  // Obtener imágenes
  const images = producto.imagenes && producto.imagenes.length > 0 
    ? producto.imagenes 
    : ['/img/producto-ejemplo.jpg'];

  // Manejar cambio de cantidad
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(producto, quantity);
    }
  };

  // Cambiar imagen
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-detail">
      <button className="btn-back" onClick={onBack}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Volver al catálogo
      </button>

      <div className="product-detail-container">
        {/* Galería de imágenes */}
        <div className="product-detail-gallery">
          <div className="main-image">
            <img 
              src={images[currentImageIndex]} 
              alt={`${producto.nombre} - Vista ${currentImageIndex + 1}`}
            />
          </div>
          
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                >
                  <img src={img} alt={`Miniatura ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="product-detail-info">
          <h1 className="product-detail-title">{producto.nombre}</h1>
          
          <div className="product-detail-price">
            {formatPrice(producto.precio)}
          </div>

          {producto.descripcion && (
            <p className="product-detail-description">
              {producto.descripcion}
            </p>
          )}

          {/* Especificaciones */}
          <div className="product-specifications">
            <h3>Especificaciones</h3>
            <ul>
              {producto.medidas && (
                <li><strong>Medidas:</strong> {producto.medidas}</li>
              )}
              {producto.materiales && (
                <li><strong>Materiales:</strong> {producto.materiales}</li>
              )}
              {producto.acabado && (
                <li><strong>Acabado:</strong> {producto.acabado}</li>
              )}
              {producto.peso && (
                <li><strong>Peso:</strong> {producto.peso}</li>
              )}
              {producto.capacidad && (
                <li><strong>Capacidad:</strong> {producto.capacidad}</li>
              )}
            </ul>
          </div>

          {/* Controles de compra */}
          <div className="product-purchase-controls">
            <div className="quantity-selector">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <button 
              className="btn-add-to-cart-large"
              onClick={handleAddToCart}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
