import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import ProductDetail from './components/ProductDetail';
import { getProductos } from './api';
import { useCart } from 'react-use-cart';
import ProductList from './pages/ProductList';
import Toast from './components/Toast';

export default function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addItem, totalItems } = useCart();

  // ===== Toast (cartelito abajo a la derecha) =====
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (message) => setToast({ show: true, message });
  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  // ⬇️ Carga reutilizable de productos (para montaje y reintentos)
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProductos();
      setProducts(data);
    } catch (e) {
      setError(e?.message ?? 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos al montar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const cartCount = totalItems;

  const addToCart = (prod, qty = 1) => {
    const normalize = (p) => ({
      id: p.id,
      price: Number(p.precio || 0), // react-use-cart usa 'price' numérico
      nombre: p.nombre,
      imagen: p.imagenes?.[0] || '/img/producto-ejemplo.jpg',
      ...p,
    });
    const cantidad = Number(qty) || 1;
    addItem(normalize(prod), cantidad);
  };

  // Handler de "Reintentar"
  const handleRetry = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // opcional UX
    loadProducts();
  };

  const renderView = () => {
    if (view === 'home') {
      const featured = products.slice(0, 4);
      return (
        <Home
          onGoCatalog={() => setView('catalog')}
          featuredProducts={featured}
          onOpenProduct={(p) => {
            setSelectedProduct(p);
            setView('product');
          }}
        />
      );
    }

    if (view === 'contact') return <Contact />;

    if (view === 'catalog') {
      return (
        <Catalog
          products={products}
          loading={loading}
          error={error}
          onSelect={(p) => {
            setSelectedProduct(p);
            setView('product');
          }}
          onRetry={handleRetry}
          onAdd={(prod, q) => {
            addToCart(prod, q);
            showToast('¡Agregado al carrito exitosamente!');
          }}
        />
      );
    }

    if (view === 'product' && selectedProduct) {
      return (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setView('catalog')}
          onAdd={(q) => {
            addToCart(selectedProduct, q);
            // ✅ cartelito abajo-derecha
            showToast('¡Agregado al carrito exitosamente!');
          }}
        />
      );
    }

    if (view === 'cart') {
      return (
        <div className="pt-5">
          <ProductList onBack={() => setView('catalog')} />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Navbar cartCount={cartCount} currentView={view} onNav={setView} />
      <main id="contenido-principal" tabIndex={-1}>
        {renderView()}
      </main>

      {/* Toast abajo a la derecha */}
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={hideToast}
        duration={2000} // opcional
      />

      <Footer />
    </>
  );
}
