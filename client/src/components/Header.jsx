/**
 * Componente Header
 * Navbar principal con logo, navegación y carrito
 */
import React from 'react';
import CartIcon from './CartIcon';
import '../styles/components/Header.css';

const Header = ({ cartItemCount }) => {
  return (
    <header className="custom-navbar navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <span className="brand-text">HERMANOS JOTA</span>
        </a>

        {/* Botón hamburguesa para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/catalogo">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">Contacto</a>
            </li>
            <li className="nav-item">
              <CartIcon itemCount={cartItemCount} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
