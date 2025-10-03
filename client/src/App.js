/**
 * Componente principal de la aplicación
 * Maneja el estado global y la navegación entre vistas
 */
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import { getAllProductos } from './services/productosService';
import './App.css';

function App() {
  // ========== ESTADOS ==========
  
  // Estado de productos
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado de navegación
  const [currentView, setCurrentView] = useState('catalogo'); // 'catalogo', 'detalle', 'contacto'
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Estado del carrito
  const [cart, setCart] = useState([]);

  // ========== EFECTOS ==========
  
  // Cargar productos al montar el componente
  useEffect(() => {
    loadProductos();
  }, []);

  // ========== FUNCIONES ==========
  
  /**
   * Carga los productos desde la API
   */
  const loadProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAllProductos();
      setProductos(data);
      
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el click en un producto para ver detalles
   */
  const handleProductClick = (producto) => {
    setSelectedProduct(producto);
    setCurrentView('detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Vuelve al catálogo desde la vista de detalle
   */
  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentView('catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Navega a la vista de contacto
   */
  const handleNavigateToContact = () => {
    setCurrentView('contacto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Navega al catálogo
   */
  const handleNavigateToCatalog = () => {
    setCurrentView('catalogo');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Agrega un producto al carrito
   */
  const handleAddToCart = (producto, quantity = 1) => {
    setCart(prevCart => {
      // Buscar si el producto ya está en el carrito
      const existingItem = prevCart.find(item => item.id === producto.id);
      
      if (existingItem) {
        // Si existe, incrementar cantidad
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        return [...prevCart, { ...producto, quantity }];
      }
    });

    // Mostrar notificación (opcional)
    console.log(`✅ ${producto.nombre} agregado al carrito (cantidad: ${quantity})`);
    
    // Aquí podrías agregar una notificación visual
    alert(`${producto.nombre} agregado al carrito`);
  };

  /**
   * Calcula el total de items en el carrito
   */
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ========== RENDERIZADO ==========

  return (
    <div className="App">
      <Header cartItemCount={getCartItemCount()} />
      
      <main className="main-content">
        {/* Renderizado condicional según la vista actual */}
        {currentView === 'catalogo' && (
          <div className="container">
            <div className="catalog-header">
              <h1>Catálogo de Productos</h1>
              <p className="lead">
                Descubre nuestra colección de muebles de diseño contemporáneo
              </p>
            </div>
            
            <ProductList
              productos={productos}
              loading={loading}
              error={error}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {currentView === 'detalle' && (
          <div className="container">
            <ProductDetail
              producto={selectedProduct}
              onBack={handleBackToCatalog}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {currentView === 'contacto' && (
          <div className="container">
            <ContactForm />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
