import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import ProductDetail from './components/ProductDetail';
import { getProductos } from './api';

export default function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (view !== 'catalog' || products.length) return;
    setLoading(true);
    getProductos()
      .then(setProducts)
      .catch(() => setError('No se pudieron cargar los productos'))
      .finally(() => setLoading(false));
  }, [view, products.length]);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  const addToCart = (prod, qty = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.id === prod.id);
      if (found) return prev.map(i => i.id === prod.id ? ({...i, qty: i.qty + qty}) : i);
      return [...prev, { id: prod.id, qty }];
    });
  };

  const renderView = () => {
    if (view === 'home') return <Home onGoCatalog={() => setView('catalog')} />;
    if (view === 'contact') return <Contact />;
    if (view === 'catalog') {
      return (
        <Catalog
          products={products}
          loading={loading}
          error={error}
          onSelect={p => { setSelectedProduct(p); setView('product'); }}
          onRetry={() => { setError(''); setView('catalog'); }} />
      );
    }
    if (view === 'product' && selectedProduct) {
      return (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setView('catalog')}
          onAdd={(q)=> addToCart(selectedProduct, q)}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Navbar
  cartCount={cartCount}
  currentView={view}
  onNav={setView}
/>

      <main id='contenido-principal' tabIndex={-1}>
        {renderView()}
      </main>
      <Footer />
    </>
  );
}
