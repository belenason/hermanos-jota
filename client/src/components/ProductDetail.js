import React from 'react';

export default function ProductDetail(props) {
  const { product, onAddToCart, onBack } = props;
  if (!product) return null;

  const imgSrc = (product.imagenes && product.imagenes[0]) ? product.imagenes[0] : '/assets/placeholder.png';

  return React.createElement(
    'div',
    { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' } },
    React.createElement('img', { src: imgSrc, alt: product.nombre, style: { width: '100%', borderRadius: 8 } }),
    React.createElement(
      'div',
      null,
      React.createElement('h2', null, product.nombre || 'Producto'),
      React.createElement('p', null, product.descripcion || ''),
      product.medidas && React.createElement('p', null, `Medidas: ${product.medidas}`),
      product.materiales && React.createElement('p', null, `Materiales: ${product.materiales}`),
      React.createElement('p', { style: { fontWeight: 600 } }, `Precio: $${(typeof product.precio === 'number') ? product.precio : 0}`),
      React.createElement(
        'div',
        { style: { display: 'flex', gap: 8, marginTop: 12 } },
        React.createElement('button', { onClick: () => onAddToCart(product) }, 'Añadir al carrito'),
        React.createElement('button', { onClick: onBack }, 'Volver')
      )
    )
  );
}
