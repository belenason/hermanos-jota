// src/components/ProductCardGrid.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCardGrid({ product, onAdd }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Imagen por defecto (PNG original)
  const imgPng = product.imagenUrl || '/img/producto-ejemplo.png';
  
  // Convertir PNG a JPG para cuando NO hay hover
  const imgJpg = imgPng.replace(/\.png$/i, '.jpg');
  
  // Cuando NO hay hover: JPG, cuando hay hover: PNG
  const currentImg = isHovered ? imgPng : imgJpg;
  
  const precio = Number(product.precio || 0).toLocaleString('es-AR');

  return (
    <article className="product-card-minimal"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
      <Link
        to={`/productos/${product.id}`}
        className="lnk-card-detalle-producto product-card-link"
        aria-label={`Ver ${product.nombre}`}
      >
        <div 
          className="product-card-image-wrapper"
        >
          <img
            src={currentImg}
            alt={product.nombre}
            className="product-card-image"
          />
        </div>

        <div className="product-card-meta">
          <h3 className="product-card-name">{product.nombre}</h3>
          <span className="product-card-price">${precio}</span>
        </div>
      </Link>

      <button
        className="btn-product-add"
        onClick={() => onAdd(product, 1)}
        aria-label={`Agregar ${product.nombre} al carrito`}
        type="button"
      >
        Agregar
      </button>
    </article>
  );
}