import React from 'react';

export default function Navbar(props) {
  const { cartCount = 0 } = props;
  return React.createElement(
    'nav',
    { style: { padding: '12px 16px', borderBottom: '1px solid #ddd' } },
    React.createElement('strong', null, 'Hermanos Jota'),
    React.createElement('span', { style: { float: 'right' } }, `Carrito: ${cartCount}`)
  );
}
