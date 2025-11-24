// src/components/ProductCardGrid.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCardGrid({ product, onAdd }) {
  const [isHovered, setIsHovered] = useState(false);

  // Normalizamos el arreglo de imágenes
  const imagenes = Array.isArray(product.imagenes)
    ? product.imagenes.filter(Boolean)
    : [];

  const fallback = '/img/producto-ejemplo.png';

  // Primera y segunda imagen
  const firstImage =
    imagenes[0] ||
    product.imagenUrl || // por si tenés productos viejos aún con este campo
    fallback;

  const secondImage =
    imagenes[1] || firstImage; // si no hay segunda, usamos la misma

  // 👉 Lo que pediste: sin hover = segunda, con hover = primera
  const currentImg = isHovered ? firstImage : secondImage;

  const precio = Number(product.precio || 0).toLocaleString('es-AR');

  return (
    <article
      className="product-card-minimal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/productos/${product.id}`}
        className="lnk-card-detalle-producto product-card-link"
        aria-label={`Ver ${product.nombre}`}
      >
        <div className="product-card-image-wrapper">
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
