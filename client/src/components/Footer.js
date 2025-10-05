import React from 'react';

export default function Footer() {
  return React.createElement(
    'footer',
    { className: 'bg-light py-3 mt-4' },
    React.createElement(
      'div',
      { className: 'container text-center text-muted small' },
      '© ', new Date().getFullYear(), ' Mueblería Hermanos Jota'
    )
  );
}
