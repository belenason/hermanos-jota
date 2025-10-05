import React from 'react';
import ProductCard from './ProductCard.js';

export default function ProductList(props) {
  const { products, onSelect } = props;

  const cols = (products || []).map(p =>
    React.createElement(
      'div',
      { className: 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex', key: p.id },
      React.createElement(ProductCard, { product: p, onSelect })
    )
  );

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('div', { className: 'row g-3' }, cols)
  );
}
