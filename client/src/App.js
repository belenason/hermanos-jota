// src/App.js
import { Link, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { getProductos } from './apiProductos';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import OrdersPage from './pages/OrdersPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ModificarCuenta from './pages/ModificarCuenta';

import AdminRoute from './auth/AdminRoute';
import ProtectedRoute from './auth/ProtectedRoute';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar productos
  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProductos();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleRetry = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadProducts();
  };

  const featuredProducts = products.slice(0, 4); // o tu lógica real

  return (
    <>
      <Navbar/>
      <main id="contenido-principal" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                featuredProducts={featuredProducts}
                loading={loading}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <CatalogPage
                products={products}
                loading={loading}
                error={error}
                onRetry={handleRetry}
              />
            }
          />
          <Route
            path="/productos/:id"
            element={<ProductDetailPage onDataMutated={loadProducts} />}
          />

          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage />} />

          {/* Rutas privadas */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-pedidos"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/crear-producto"
            element={
              <AdminRoute>
                <CreateProductPage onDataMutated={loadProducts} />
              </AdminRoute>
            }
          />
          <Route
            path="/productos/editar/:id"
            element={
              <AdminRoute>
                <EditProductPage onDataMutated={loadProducts} />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanelPage
                  products={products}
                  loading={loading}
                  onDataMutated={loadProducts}
                />
              </AdminRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* 404 básica */}
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
          <Route
            path="/modificar-cuenta"
            element={
            <ProtectedRoute>
              <ModificarCuenta />
            </ProtectedRoute>
  }
/>

        </Routes>
      </main>

      {/* Toaster global de la librería */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          className: 'hj-toast',
          success: { icon: '🛒' },
          error:   { icon: '⚠️' },
        }}
      />


      <Footer />
    </>
  );
}
