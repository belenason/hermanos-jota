import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ProductDetail — versión moderna y minimalista
 * Inspirada en el HTML legacy (producto.html), pero en React y con mejoras de UX/A11y.
 *
 * Props esperadas:
 * - product: { id, nombre, precio, descripcion, imagenes[], medidas, materiales, acabado, ... }
 * - onBack:   () => void
 * - onAdd:    (qty:number) => void
 */
export default function ProductDetail({ product, onBack, onAdd }) {
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const galleryRef = useRef(null);
  const thumbsRef = useRef(null);

  const images = useMemo(() => {
    const arr = Array.isArray(product?.imagenes) && product.imagenes.length
      ? product.imagenes
      : ['/img/producto-ejemplo.jpg'];
    return arr;
  }, [product]);

  const price = useMemo(() => Number(product?.precio || 0).toLocaleString('es-AR'), [product]);

  // Derivar especificaciones desde claves más comunes (y permitir extras)
  const specs = useMemo(() => {
    if (!product) return [];
    const order = ['medidas', 'materiales', 'acabado', 'peso', 'capacidad', 'tapizado', 'confort', 'estructura', 'relleno', 'sostenibilidad', 'extension', 'apilables', 'incluye', 'garantia'];
    const known = order.filter(k => product[k]);

    // Incluir cualquier otra key “descriptiva” (no técnicas) que no esté ya
    const excluded = new Set(['id','nombre','precio','descripcion','imagenes']);
    const dynamic = Object.keys(product)
      .filter(k => !excluded.has(k) && !known.includes(k) && typeof product[k] === 'string' && product[k].length < 120);

    return [...known, ...dynamic].map(k => ({ label: toLabel(k), value: product[k] }));
  }, [product]);

  function toLabel(key){
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^\w/, s => s.toUpperCase());
  }

  // Accesibilidad / UX
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  // Navegación del carrusel
  const go = (nextIdx) => {
    const total = images.length;
    const n = (nextIdx + total) % total;
    setIdx(n);
    // Mantener miniatura a la vista
    const bar = thumbsRef.current;
    const thumb = bar?.querySelector(`[data-idx="${n}"]`);
    if (thumb && bar) {
      const { left: tL, right: tR } = thumb.getBoundingClientRect();
      const { left: bL, right: bR } = bar.getBoundingClientRect();
      if (tL < bL || tR > bR) thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
  };

  // Gestos táctiles simples
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [idx, images.length]);

  const clampQty = (n) => Math.max(1, Math.min(99, Number.isFinite(n) ? n : 1));

  return (
    <div className="container mt-5 pt-4 pt-md-5 mb-5 mt-5" onKeyDown={onKeyDown}>
      {/* MIGAS DE PAN */}
      <nav aria-label="breadcrumb" className="mb-3 mt-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button className=" bread-personalizado btn btn-link p-0 " onClick={onBack}>Catálogo</button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{product?.nombre}</li>
        </ol>
      </nav>

      {/* TÍTULO */}
      <h2 className="product-title">{product?.nombre}</h2>

      <section className="product-detail">
        <div className="row g-4 align-items-start">
          {/* Galería */}
          <div className="col-lg-7">
            <section
              className="product-gallery mb-3"
              ref={galleryRef}
              role="region"
              aria-label={`Galería de imágenes de ${product?.nombre}`}
            >
              {/* Imagen activa */}
              <div className="position-relative">
                <button
                  className="carousel-control-prev"
                  aria-label="Imagen anterior"
                  onClick={() => go(idx - 1)}
                  type="button"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Anterior</span>
                </button>

                <img
                  src={images[idx]}
                  alt={`${product?.nombre} ${idx + 1}`}
                  className="d-block w-100"
                  style={{ objectFit: 'contain', maxHeight: 450 }}
                />

                <button
                  className="carousel-control-next"
                  aria-label="Imagen siguiente"
                  onClick={() => go(idx + 1)}
                  type="button"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>

              {/* Miniaturas */}
              <div className="product-thumbs mt-2" ref={thumbsRef} aria-label="Miniaturas">
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

            {/* Descripción y especificaciones */}
            {product?.descripcion && (
              <p className="product-desc mt-3">{product.descripcion}</p>
            )}
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

              <div className="d-flex gap-2">
                <button className="btn-brand" onClick={() => onAdd(clampQty(qty))}>
                  Añadir al carrito
                </button>
                <button className="btn-outline-brand" onClick={onBack}>Volver al catálogo</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
