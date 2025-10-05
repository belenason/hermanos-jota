import React from 'react';

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(n)||0);
  } catch { return `$${n}`; }
}

export default function ProductCard(props) {
  const { product, onSelect } = props;
  const imgSrc = (product.imagenes && product.imagenes[0]) ? product.imagenes[0] : '/assets/placeholder.png';

  return React.createElement(
    'div',
    { className: 'card h-100' },
    React.createElement('img', { src: imgSrc, className: 'card-img-top', alt: product.nombre }),
    React.createElement(
      'div',
      { className: 'card-body d-flex flex-column' },
      React.createElement('h5', { className: 'card-title' }, product.nombre || 'Producto'),
      React.createElement('p', { className: 'card-text mb-2 text-muted' }, product.descripcion ? String(product.descripcion).slice(0, 90) + '…' : ''),
      React.createElement('div', { className: 'mt-auto fw-semibold' }, formatCurrency(product.precio)),
      React.createElement(
        'button',
        { className: 'btn btn-primary mt-2', onClick: () => onSelect(product) },
        'Ver detalle'
      )
    )
  );
}
