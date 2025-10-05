import React from 'react';

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(n)||0);
  } catch { return `$${n}`; }
}

export default function ProductDetail(props) {
  const { product, onAddToCart, onBack } = props;
  if (!product) return null;
  const imgSrc = (product.imagenes && product.imagenes[0]) ? product.imagenes[0] : '/assets/placeholder.png';

  const infoList = [
    ['Medidas', product.medidas],
    ['Materiales', product.materiales],
    ['Acabado', product.acabado],
    ['Peso', product.peso],
    ['Capacidad', product.capacidad],
  ].filter(([_, v]) => !!v);

  const infoItems = infoList.map(([k, v], i) =>
    React.createElement('li', { key: i, className: 'list-group-item' },
      React.createElement('strong', null, `${k}: `), String(v))
  );

  return React.createElement(
    'div',
    { className: 'container my-3' },
    React.createElement(
      'div',
      { className: 'row g-4' },
      React.createElement(
        'div',
        { className: 'col-12 col-lg-6' },
        React.createElement('img', { src: imgSrc, alt: product.nombre, className: 'img-fluid rounded' })
      ),
      React.createElement(
        'div',
        { className: 'col-12 col-lg-6' },
        React.createElement('h2', { className: 'h3' }, product.nombre),
        React.createElement('p', { className: 'text-muted' }, product.descripcion || ''),
        React.createElement('p', { className: 'fs-5 fw-semibold' }, formatCurrency(product.precio)),
        infoItems.length
          ? React.createElement('ul', { className: 'list-group mb-3' }, infoItems)
          : null,
        React.createElement(
          'div',
          { className: 'd-flex gap-2' },
          React.createElement('button', { className: 'btn btn-success', onClick: () => onAddToCart(product) }, 'Añadir al carrito'),
          React.createElement('button', { className: 'btn btn-outline-secondary', onClick: onBack }, 'Volver')
        )
      )
    )
  );
}

