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
        const data = await fetchProducts();   // devuelve objetos con nombre/precio/imagenes
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const header = React.createElement(Navbar, { cartCount: cart.length });
  const footer = React.createElement(Footer);

  if (loading) {
    return React.createElement('div', { style: { padding: 16 } }, header, React.createElement('p', null, 'Cargando...'), footer);
  }
  if (err) {
    return React.createElement('div', { style: { padding: 16 } }, header, React.createElement('p', { style: { color: 'red' } }, err), footer);
  }

  let main = null;

  if (view === 'catalog') {
    main = React.createElement(
      'div',
      { style: { display: 'grid', gap: 24 } },
      React.createElement('h2', null, 'Catálogo'),
      React.createElement(ProductList, { products, onSelect: (p) => { setSelected(p); setView('detail'); } }),
      React.createElement('div', null, React.createElement('button', { onClick: () => setView('contact') }, 'Ir a Contacto'))
    );
  }

  if (view === 'detail' && selected) {
    main = React.createElement(ProductDetail, {
      product: selected,
      onAddToCart: (p) => setCart(prev => [...prev, p]),
      onBack: () => { setSelected(null); setView('catalog'); }
    });
  }

  if (view === 'contact') {
    main = React.createElement(
      'div',
      { style: { display: 'grid', gap: 16 } },
      React.createElement('h2', null, 'Contacto'),
      React.createElement(ContactForm, null),
      React.createElement('button', { onClick: () => setView('catalog') }, 'Volver al catálogo')
    );
  }

  return React.createElement('div', { style: { padding: 16, display: 'grid', gap: 16 } }, header, main, footer);
}
