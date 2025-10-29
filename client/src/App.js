import { useEffect, useState, useCallback } from 'react';
import { getProductos } from './api';
import { useCart } from 'react-use-cart';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';


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
      const productsWithId = data.map(p => ({ ...p, id: p._id }));
      setProducts(productsWithId);
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
      // Los productos de MongoDB tienen _id, no id.
      id: p._id,
      price: Number(p.precio || 0), // react-use-cart usa 'price' numérico
      nombre: p.nombre,
      imagen: p.imagenUrl || '/img/producto-ejemplo.jpg',
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

  return (
    <>
      <Navbar cartCount={cartCount} currentView={view} onNav={setView} />
      <main id="contenido-principal" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<CatalogPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        {/*FIJARME COMO CAMBIAR LO DE SET VIEW*/}
        <Route path="/carrito" element={<CartPage onBack={() => setView('catalog')} />} />
        <Route path="/admin/crear-producto" element={<HomePage />} />
      </Routes>
      </main>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} duration={2000}/>
      <Footer />
    </>
  );
}


