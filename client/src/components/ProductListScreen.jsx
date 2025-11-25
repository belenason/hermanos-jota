// src/components/ProductListScreen.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProducto } from '../apiProductos';

const ProductListScreen = ({ products = [], loading, onDataMutated }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    if (deleting) return;
    setShowModal(false);
    setSelectedProduct(null);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeleting(true);
      await deleteProducto(selectedProduct._id);
      if (onDataMutated) onDataMutated();
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error al eliminar producto');
    } finally {
      setDeleting(false);
    }
  };

  const createHandler = () => {
    navigate('/admin/crear-producto');
  };

  if (loading) {
    return (
      <div className="product-list-state">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (!loading && (!products || products.length === 0)) {
    return (
      <div className="product-list-container">
        <div className="product-list-header">
          <h2 className="product-list-title">Productos</h2>
          <button className="create-product-btn" onClick={createHandler}>
            <i className="bi bi-plus-circle"></i>
            Crear producto
          </button>
        </div>
        <div className="product-list-state">
          <i className="bi bi-box-seam"></i>
          <p>No hay productos cargados</p>
          <button className="create-product-btn secondary" onClick={createHandler}>
            <i className="bi bi-plus-circle"></i>
            Crear tu primer producto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="header-info">
          <h2 className="product-list-title">Productos</h2>
          <span className="product-count">{products.length} productos</span>
        </div>
        <button className="create-product-btn" onClick={createHandler}>
          <i className="bi bi-plus-circle"></i>
          Crear producto
        </button>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((producto) => (
              <tr key={producto._id}>
                <td>
                  <div className="product-cell">
                    <span className="product-name">{producto.nombre}</span>
                    <span className="product-id">ID: {producto._id?.substring(producto._id.length - 6)}</span>
                  </div>
                </td>
                <td>
                  <span className="product-price">${Number(producto.precio).toLocaleString('es-AR')}</span>
                </td>
                <td>
                  <span className="product-stock">{producto.stock ?? '—'}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/productos/editar/${producto._id}`}
                      className="action-btn edit"
                      title="Editar producto"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => openDeleteModal(producto)}
                      title="Eliminar producto"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {showModal && selectedProduct && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="modal-header">
              <i className="bi bi-exclamation-triangle"></i>
              <h3>Eliminar producto</h3>
            </div>

            <div className="modal-body">
              <p>
                ¿Estás seguro que querés eliminar el producto{' '}
                <strong>{selectedProduct.nombre}</strong>?
              </p>
              <div className="modal-warning">
                <i className="bi bi-info-circle"></i>
                <span>Esta acción no se puede deshacer</span>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-btn cancel" 
                onClick={closeModal}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                className="modal-btn confirm delete"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Eliminando...' : 'Eliminar producto'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;