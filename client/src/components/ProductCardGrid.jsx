// src/components/ProductCardGrid.jsx
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../Cart/CartContext';

export default function ProductCardGrid({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);

  // 👇 ID normalizado para evitar "undefined"
  const productId = product.id || product._id;

  // Normalizamos el arreglo de imágenes
  const imagenes = Array.isArray(product.imagenes)
    ? product.imagenes.filter(Boolean)
    : [];

  const fallback = '/img/producto-ejemplo.png';

  const firstImage =
    imagenes[0] ||
    product.imagenUrl ||
    fallback;

  const secondImage = imagenes[1] || firstImage;

  const currentImg = isHovered ? firstImage : secondImage;
  const precio = Number(product.precio || 0).toLocaleString('es-AR');

  return (
    <article
      className="product-card-minimal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/productos/${productId}`}
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
        onClick={() => addToCart(product, 1)}
        aria-label={`Agregar ${product.nombre} al carrito`}
        type="button"
      >
        Agregar
      </button>
    </article>
  );
}
