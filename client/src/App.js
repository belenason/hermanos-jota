// src/App.js
import { Link, Routes, Route }  from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductos } from './apiProductos';
import { useCart } from 'react-use-cart';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import ProductDetailRoute from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addItem, totalItems } = useCart();

  // Toast
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (message) => setToast({ show: true, message });
  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  // Cargar productos (se llama al montar y cuando hace retry)
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProductos(); // devuelve un array de productos
      const productsWithId = (Array.isArray(data) ? data : []).map((p) => ({
        ...p,
        id: p._id,
      }));
      setProducts(productsWithId);
    } catch (e) {
      setError(e?.message ?? 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar la App (para que Home tenga data en el primer ingreso)
  useEffect(() => {
    loadProducts();
  }, []);

  // Agregar al carrito + toast
  const addToCart = (prod, qty = 1) => {
    const normalize = (p) => ({
      id: p._id || p.id,
      price: Number(p.precio || 0),
      nombre: p.nombre,
      imagen: p.imagenUrl || '/img/producto-ejemplo.png',
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

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Navbar cartCount={totalItems} />
      <main id="contenido-principal" tabIndex={-1}>
        <Routes>
          <Route path="/" element={ <HomePage featuredProducts={featuredProducts} loading={loading}/>}/>
          <Route path="/productos" element={ <CatalogPage products={products} loading={loading} error={error} onRetry={handleRetry} onAdd={addToCart}/>}/>
          <Route path="/productos/:id" element={<ProductDetailRoute onAdd={addToCart} onDataMutated={loadProducts} />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/admin/crear-producto" element={<CreateProductPage onDataMutated={loadProducts} />} />
          <Route path="/productos/editar/:id" element={<EditProductPage onDataMutated={loadProducts} />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route
            path="*"
            element={
              <div className="container py-5 mt-5">
                <h2 className="mb-3">Página no encontrada</h2>
                <p>Revisá la URL o volvé al catálogo.</p>
                <Link to="/productos" className="btn-secondary-custom">
                  Ir al catálogo
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} duration={2000} />
      <Footer />
    </>
  );
}
