import React, { useEffect, useState } from 'react';
import { fetchProducts } from './services/api.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';
import ContactForm from './components/ContactForm.js';

export default function App() {
  const [view, setView] = useState('catalog'); // 'catalog' | 'detail' | 'contact'
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const header = React.createElement(Navbar, {
    cartCount: cart.length,
    onGoHome: () => { setSelected(null); setView('catalog'); },
    onGoContact: () => setView('contact')
  });
  const footer = React.createElement(Footer);

  let main;
  if (loading) {
    main = React.createElement('div', { className: 'container my-4' }, React.createElement('p', null, 'Cargando...'));
  } else if (err) {
    main = React.createElement('div', { className: 'container my-4' }, React.createElement('div', { className: 'alert alert-danger' }, err));
  } else if (view === 'catalog') {
    main = React.createElement(
      'div',
      { className: 'container my-4' },
      React.createElement('h2', { className: 'mb-3' }, 'Catálogo'),
      React.createElement(ProductList, { products, onSelect: (p) => { setSelected(p); setView('detail'); } }),
    );
  } else if (view === 'detail' && selected) {
    main = React.createElement(ProductDetail, {
      product: selected,
      onAddToCart: (p) => setCart(prev => [...prev, p]),
      onBack: () => { setSelected(null); setView('catalog'); }
    });
  } else if (view === 'contact') {
    main = React.createElement(ContactForm, null);
  } else {
    main = React.createElement('div', { className: 'container my-4' }, 'Sin contenido');
  }

  return React.createElement(React.Fragment, null, header, main, footer);
}
