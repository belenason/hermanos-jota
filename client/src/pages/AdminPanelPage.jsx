// src/pages/AdminPanelPage.jsx
import React, { useState } from 'react';
import ProductListScreen from '../components/ProductListScreen';
import UserListScreen from '../components/UserListScreen';
import OrderListScreen from '../components/OrderListScreen';

const AdminPanelPage = ({ products, loading, onDataMutated }) => {
  const [activeTab, setActiveTab] = useState('productos');

  const tabs = [
    { id: 'productos', label: 'Productos', icon: 'bi-box-seam' },
    { id: 'usuarios', label: 'Usuarios', icon: 'bi-people' },
    { id: 'pedidos', label: 'Pedidos', icon: 'bi-receipt' }
  ];

  return (
    <div className="admin-panel-layout">
      {/* Animación de fondo */}
      <div className="admin-bg-animation">
        <div className="admin-float-circle admin-circle-1"></div>
        <div className="admin-float-circle admin-circle-2"></div>
      </div>

      <div className="admin-container">
        <section className="admin-header">
					<div className="contact-container">
          <h2 className="hero-title">Panel de administración</h2>
          <p className="hero-subtitle">Gestiona productos, usuarios y pedidos</p>
					</div>
        </section>

        <div className="admin-grid">
          {/* Sidebar de navegación */}
          <aside className="admin-sidebar">
            <nav className="admin-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`bi ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Contenido principal */}
          <main className="admin-content">
            <div className="admin-content-card">
              {activeTab === 'productos' && (
                <ProductListScreen
                  products={products}
                  loading={loading}
                  onDataMutated={onDataMutated}
                />
              )}
              {activeTab === 'usuarios' && <UserListScreen />}
              {activeTab === 'pedidos' && <OrderListScreen />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;