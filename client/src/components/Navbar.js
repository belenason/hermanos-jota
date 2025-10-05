import React from 'react';

export default function Navbar(props) {
  const { cartCount = 0, onGoHome, onGoContact } = props;

  return React.createElement(
    'nav',
    { className: 'navbar navbar-expand-lg navbar-light bg-light' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'a',
        { className: 'navbar-brand', href: '#', onClick: (e)=>{e.preventDefault(); onGoHome && onGoHome();} },
        'Hermanos Jota'
      ),
      React.createElement(
        'button',
        {
          className: 'navbar-toggler',
          type: 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#navbarNav',
          'aria-controls': 'navbarNav',
          'aria-expanded': 'false',
          'aria-label': 'Toggle navigation'
        },
        React.createElement('span', { className: 'navbar-toggler-icon' })
      ),
      React.createElement(
        'div',
        { className: 'collapse navbar-collapse', id: 'navbarNav' },
        React.createElement(
          'ul',
          { className: 'navbar-nav me-auto mb-2 mb-lg-0' },
          React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(
              'a',
              { className: 'nav-link active', 'aria-current': 'page', href: '#', onClick: (e)=>{e.preventDefault(); onGoHome && onGoHome();} },
              'Inicio'
            )
          ),
          React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(
              'a',
              { className: 'nav-link', href: '#', onClick: (e)=>{e.preventDefault(); onGoContact && onGoContact();} },
              'Contacto'
            )
          )
        ),
        React.createElement(
          'span',
          { className: 'navbar-text' },
          `Carrito: ${cartCount}`
        )
      )
    )
  );
}
