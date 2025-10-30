// src/App.js
import { useEffect, useState } from 'react';
import { getProductos } from './api';
import { useCart } from 'react-use-cart';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';

// NUEVOS contenedores/páginas
import ProductDetailRoute from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addItem, totalItems } = useCart();
  const navigate = useNavigate();

  // Toast
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (message) => setToast({ show: true, message });
  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  // Cargar productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProductos();
      // normalizo id desde Mongo (_id)
      const productsWithId = data.map(p => ({ ...p, id: p._id }));
      setProducts(productsWithId);
    } catch (e) {
      setError(e?.message ?? 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadProducts(); 
  }, []); // Array vacío: solo se ejecuta al montar el componente

  // Agregar al carrito + toast
  const addToCart = (prod, qty = 1) => {
    const normalize = (p) => ({
      id: p._id || p.id,
      price: Number(p.precio || 0),
      nombre: p.nombre,
      imagen: p.imagenUrl || '/img/producto-ejemplo.jpg',
      ...p,
    });
    const cantidad = Number(qty) || 1;
    addItem(normalize(prod), cantidad);
    showToast('Producto agregado al carrito 🛒');
  };

  const handleRetry = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadProducts();
  };

  return (
    <>
      <Navbar cartCount={totalItems} />
      <main id="contenido-principal" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage onGoCatalog={() => navigate('/productos')} featuredProducts={products}/>} />
          <Route path="/productos" element={ <CatalogPage products={products} loading={loading} error={error} onRetry={handleRetry} onAdd={addToCart} />} />
          <Route path="/productos/:id" element={<ProductDetailRoute onAdd={addToCart} />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage onBack={() => navigate('/productos')} />} />
          <Route path="/admin/crear-producto" element={<CreateProductPage />} />
        </Routes>
      </main>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} duration={2000} />
      <Footer />
    </>
  );
}