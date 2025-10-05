export default function ProductCardGrid({ product, onOpen, onAdd }) {
  const img = product.imagenes?.[0] || '/img/producto-ejemplo.jpg';
  const precio = Number(product.precio || 0).toLocaleString('es-AR');

  return (
    <article className="estiloProducto botonAgregarCarro">
      <button
        onClick={onOpen}
        className="letra-producto"
        style={{ all: 'unset', cursor: 'pointer', display: 'block' }}
        aria-label={`Ver ${product.nombre}`}
      >
        <img src={img} alt={product.nombre} />
        <div className="estiloProducto-content">
          <h3>{product.nombre}</h3>
          {product.descripcion && <p>{product.descripcion}</p>}
          <span className="price">${precio}</span>
        </div>
      </button>

      <button
        className="btn-add-to-cart"
        onClick={() => onAdd(product, 1)}
        aria-label={`Agregar ${product.nombre} al carrito`}
      >
        Agregar al Carrito
      </button>
    </article>
  );
}
