import { useState, useEffect, useState as ReactUseState } from 'react';

export default function ProductDetail({ product, onBack, onAdd }) {
  const [qty, setQty] = useState(1);

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <>
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><button className="btn btn-link p-0" onClick={onBack}>Catálogo</button></li>
          <li className="breadcrumb-item active" aria-current="page">{product.nombre}</li>
        </ol>
      </nav>

      <h1 className="product-title">{product.nombre}</h1>
      <div className="row g-4">
        <div className="col-lg-7">
          <img src={product.imagenes?.[0] || '/img/producto-ejemplo.jpg'} alt={product.nombre} className="img-fluid rounded" />
          <p className="product-desc mt-3">{product.descripcion}</p>
          <ul className="product-specs">
            {product.medidas && <li><strong>Medidas:</strong> {product.medidas}</li>}
            {product.materiales && <li><strong>Materiales:</strong> {product.materiales}</li>}
            {product.acabado && <li><strong>Acabado:</strong> {product.acabado}</li>}
          </ul>
        </div>
        <div className="col-lg-5">
          <div className="purchase-card">
            <div className="price">$ {Number(product.precio||0).toLocaleString('es-AR')}</div>
            <div className="label">Cantidad</div>
            <input type="number" min="1" max="99" value={qty} onChange={(e)=>setQty(Math.max(1, Math.min(99, Number(e.target.value)||1)))} className="form-control mb-3" />
            <div className="d-flex gap-2">
              <button className="btn-brand" onClick={()=>onAdd(qty)}>Añadir al carrito</button>
              <button className="btn-outline-brand" onClick={onBack}>Volver al catálogo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
