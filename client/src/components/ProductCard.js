import React from 'react';

export default function ProductCard(props) {
  const { product, onSelect } = props;

  const imgSrc = (product.imagenes && product.imagenes[0]) ? product.imagenes[0] : '/assets/placeholder.png';
  const nombre = product.nombre || 'Producto';
  const precio = (typeof product.precio === 'number') ? product.precio : 0;

  return React.createElement(
    'div',
    {
      style: {
        border: '1px solid #e5e5e5', borderRadius: 8, padding: 12, width: 260,
        display: 'flex', flexDirection: 'column', gap: 8
      }
    },
    React.createElement('img', { src: imgSrc, alt: nombre, style: { width: '100%', borderRadius: 6, objectFit: 'cover' } }),
    React.createElement('div', { style: { fontWeight: 600 } }, nombre),
    React.createElement('div', null, `$${precio}`),
    React.createElement(
      'button',
      { onClick: () => onSelect(product), style: { padding: '8px 10px', cursor: 'pointer' } },
      'Ver detalle'
    )
  );
}
