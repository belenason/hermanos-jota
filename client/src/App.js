import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import ProductDetail from './components/ProductDetail';
import { getProductos } from './api';
import { useCart } from 'react-use-cart';
import ProductList from './pages/ProductList';

export default function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {addItem,totalItems} =useCart();

  // Fetch products once on mount so Home can show featured items
  useEffect(() => {
    if (products.length) return;
    setLoading(true);
    getProductos()
      .then(setProducts)
      .catch(() => setError('No se pudieron cargar los productos'))
      .finally(() => setLoading(false));
  }, [products.length]);

  //const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartCount = totalItems;

const addToCart = (prod, qty = 1) => {
  const normalize = (p) => ({
    id: p.id,
    price: Number(p.precio || 0),                 // react-use-cart usa 'price' numérico
    nombre: p.nombre,
    imagen: p.imagenes?.[0] || '/img/producto-ejemplo.jpg',
    ...p,
  });
  const cantidad = Number(qty) || 1;
  addItem(normalize(prod), cantidad);
};

  const renderView = () => {
    if (view === 'home') {
      const featured = products.slice(0, 4);
      return <Home onGoCatalog={() => setView('catalog')} featuredProducts={featured} onOpenProduct={(p)=>{ setSelectedProduct(p); setView('product'); }} />;
    }
    if (view === 'contact') return <Contact />;
    if (view === 'catalog') {
      return (
        <Catalog
          products={products}
          loading={loading}
          error={error}
          onSelect={p => { setSelectedProduct(p); setView('product'); }}
          onRetry={() => { setError(''); setView('catalog'); }}
          onAdd={(prod, q) => addToCart(prod, q)}
        />
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
    if (view === 'cart') {
      return (
        <div className="pt-5"> {/* Ajusta el valor según necesites */}
          <ProductList
            onBack={() => setView('catalog')}
          />
        </div>
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
