import { Link } from 'react-router-dom';
export default function ProductCard({ product}) {
  const img = product.imagenUrl || '/img/producto-ejemplo.jpg';
  return (
    <Link to={`/productos/${product.id}`} className="text-decoration-none">
      <article className="product-card h-100 text-center" role="button">
        <div className="product-image"><img src={img} alt={product.nombre} className="img-fluid" /></div>
        <div className="product-info">
          <h3 className="product-dest-title">{product.nombre}</h3>
          <p className="product-price">${Number(product.precio||0).toLocaleString('es-AR')}</p>
        </div>
      </article>
    </Link>
  );
}
