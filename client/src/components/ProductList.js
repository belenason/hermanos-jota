import React from 'react';
import ProductCard from './ProductCard.js';

export default function ProductList(props) {
  const { products, onSelect } = props;

  const cards = (products || []).map(p =>
    React.createElement(ProductCard, { key: p.id, product: p, onSelect })
  );

  return React.createElement(
    'div',
    { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 } },
    cards
  );
}
