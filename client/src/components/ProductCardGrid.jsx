import { Link } from 'react-router-dom';

export default function ProductCardGrid({ product, onAdd }) {
  const img = product.imagenUrl || '/img/producto-ejemplo.png';
  const precio = Number(product.precio || 0).toLocaleString('es-AR');

  return (
    <article className="estiloProducto botonAgregarCarro">
      <Link to={`/productos/${product.id}`} className="letra-producto text-decoration-none lnk-card-detalle-producto" aria-label={`Ver ${product.nombre}`} >
        <img src={img} alt={product.nombre} />
        <div className="estiloProducto-content">
          <h3>{product.nombre}</h3>
          {product.descripcion && <p>{product.descripcion}</p>}
          <span className="price">${precio}</span>
        </div>
      </Link>

      <button className="btn-add-to-cart" onClick={() => onAdd(product, 1)} aria-label={`Agregar ${product.nombre} al carrito`} >
        Agregar al Carrito
      </button>
    </article>
  );
}
