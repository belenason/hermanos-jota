// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById, deleteProducto } from '../api';
import { Link } from 'react-router-dom';

export default function ProductDetailPage({ onBack, onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);

  // Cargar producto por id
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const p = await getProductoById(id);
        setProduct({ ...p, id: p._id || p.id });
      } catch (e) {
        setErr(e?.message ?? 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, []); 

  // Calcular imágenes
  const images = product?.imagenUrl ? [product.imagenUrl] : ['/img/producto-ejemplo.jpg'];

  // Calcular precio formateado
  const price = Number(product?.precio || 0).toLocaleString('es-AR');

  // Calcular especificaciones
  const getSpecs = () => {
    if (!product) return [];
    const order = [
      'medidas','materiales','acabado','peso','capacidad','tapizado','confort',
      'estructura','relleno','sostenibilidad','extension','apilables','incluye','garantia'
    ];
    const known = order.filter(k => product[k]);
    const excluded = new Set(['_id','id','nombre','precio','descripcion','createdAt','updatedAt','imagenUrl','Id','__v']);
    const dynamic = Object.keys(product)
      .filter(k => !excluded.has(k) && !known.includes(k) && typeof product[k] === 'string' && product[k].length < 120);
    const toLabel = (key) => key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^\w/, s => s.toUpperCase());
    return [...known, ...dynamic].map(k => ({ label: toLabel(k), value: product[k] }));
  };
  const specs = getSpecs();

  const go = (nextIdx) => {
    const total = images.length;
    const n = (nextIdx + total) % total;
    setIdx(n);
    
    const bar = document.querySelector('.product-thumbs');
    const thumb = bar?.querySelector(`[data-idx="${n}"]`);
    if (thumb && bar) {
      const { left: tL, right: tR } = thumb.getBoundingClientRect();
      const { left: bL, right: bR } = bar.getBoundingClientRect();
      if (tL < bL || tR > bR) {
        thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const clampQty = (n) => Math.max(1, Math.min(99, Number.isFinite(n) ? n : 1));

  const handleDelete = async () => {
    if (!product) return;
    if (!window.confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return;
    try {
      await deleteProducto(product.id);
      navigate('/productos');
    } catch (e) {
      alert(e?.message ?? 'No se pudo eliminar el producto');
    }
  };

  if (loading) {
    return (
      <section className="container py-5">
        <p>Cargando producto…</p>
      </section>
    );
  }

if (err || !product) {
  return (
    <section className="container product-error-container mt-5">
      <h2>{err || 'Producto no encontrado'}</h2>
      <Link to="/productos" className="btn-secondary-custom mt-3">
        Volver al catálogo
      </Link>
    </section>
  );
}

  return (
    <div className="container mt-5 pt-4 pt-md-5 mb-5">
      {/* Migas */}
      <nav aria-label="breadcrumb" className="mb-3 mt-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/productos" className=" bread-personalizado btn btn-link p-0 ">Catálogo</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{product?.nombre}</li>
        </ol>
      </nav>

      <h2 className="product-title">{product?.nombre}</h2>

      <section className="product-detail">
        <div className="row g-4 align-items-start">
          {/* Galería */}
          <div className="col-lg-7">
            <section className="product-gallery mb-3" aria-label={`Galería de imágenes de ${product?.nombre}`}>
              <div className="position-relative">
                <button className="carousel-control-prev" aria-label="Imagen anterior" onClick={() => go(idx - 1)} type="button">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Anterior</span>
                </button>

                <img
                  src={images[idx]}
                  alt={`${product?.nombre} ${idx + 1}`}
                  className="d-block w-100"
                  style={{ objectFit: 'contain', maxHeight: 450 }}
                />

                <button className="carousel-control-next" aria-label="Imagen siguiente" onClick={() => go(idx + 1)} type="button">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>

              <div className="product-thumbs mt-2" aria-label="Miniaturas">
                {images.map((src, i) => (
                  <img 
                    key={src + i} 
                    src={src} 
                    data-idx={i} 
                    alt={`Vista ${i + 1}`} 
                    className={i === idx ? 'active' : ''} 
                    onClick={() => go(i)} 
                  />
                ))}
              </div>
            </section>

            {product?.descripcion && <p className="product-desc mt-3">{product.descripcion}</p>}
            {specs.length > 0 && (
              <ul className="product-specs mt-3">
                {specs.map(({ label, value }) => (
                  <li key={label}><strong>{label}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Compra */}
          <div className="col-lg-5 d-flex justify-content-center">
            <aside className="purchase-card w-100" style={{ maxWidth: 460 }}>
              <div className="price">$ {price}</div>

              <div className="label">Cantidad</div>
              <div className="qty-input mb-3">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => setQty(q => clampQty(q - 1))} 
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <input 
                  id="qty" 
                  type="number" 
                  min={1} 
                  max={99} 
                  className="form-control text-center" 
                  style={{ maxWidth: 100 }} 
                  value={qty} 
                  onChange={(e) => setQty(clampQty(parseInt(e.target.value, 10)))} 
                />
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => setQty(q => clampQty(q + 1))} 
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

<div className="d-flex flex-column gap-2">
  <button className="btn-brand w-100" onClick={() => onAdd(product, clampQty(qty))}>
    <i className="bi bi-cart-plus me-2" aria-hidden="true"></i>
    Añadir al carrito
  </button>
  <div className="d-flex gap-2">
    <Link to="/productos" className="btn-outline-brand flex-fill">
      <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
      Volver
    </Link>
    <button className="btn-delete flex-fill" onClick={handleDelete}>
      <i className="bi bi-trash me-2" aria-hidden="true"></i>
      Eliminar
    </button>
  </div>
</div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}