// src/components/OrderListScreen.jsx
import React, { useEffect, useState } from 'react';
import { getPedidosAdmin, actualizarEstadoPedido } from '../apiPedidos';

const ESTADOS_PREDEFINIDOS = ['pendiente', 'procesando', 'enviado', 'completado', 'cancelado'];

const OrderListScreen = () => {

  const [pedidos, setPedidos] = useState([]);
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openPedidoId, setOpenPedidoId] = useState(null);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [actualizandoEstado, setActualizandoEstado] = useState(false);

  const pedidosFiltrados = estado
  ? pedidos.filter((p) => p.estado === estado)
  : pedidos;

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidosAdmin();
        setPedidos(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al cargar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const togglePedido = (id) => {
    setOpenPedidoId((prev) => (prev === id ? null : id));
  };

  const abrirModalEstado = (pedido) => {
    setPedidoSeleccionado(pedido);
    setNuevoEstado(pedido.estado || '');
    setShowModal(true);
  };

  const cerrarModal = () => {
    if (actualizandoEstado) return;
    setShowModal(false);
    setPedidoSeleccionado(null);
    setNuevoEstado('');
  };

  const confirmarCambioEstado = async () => {
    if (!pedidoSeleccionado || !nuevoEstado) return;

    try {
      setActualizandoEstado(true);
      await actualizarEstadoPedido(pedidoSeleccionado._id, nuevoEstado);

      setPedidos((prev) =>
        prev.map((p) =>
          p._id === pedidoSeleccionado._id ? { ...p, estado: nuevoEstado } : p
        )
      );

      cerrarModal();
    } catch (err) {
      console.error(err);
      alert(err.message || 'No se pudo actualizar el estado del pedido.');
    } finally {
      setActualizandoEstado(false);
    }
  };

  const getEstadoBadgeClass = (estado) => {
    const estados = {
      'pendiente': 'pending',
      'procesando': 'processing',
      'enviado': 'shipped',
      'completado': 'completed',
      'cancelado': 'cancelled'
    };
    return estados[estado] || 'default';
  };

  if (loading) {
    return (
      <div className="order-list-state">
        <div className="loading-spinner"></div>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-list-state error">
        <i className="bi bi-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="order-list-state">
        <i className="bi bi-inbox"></i>
        <p>No hay pedidos todavía</p>
      </div>
    );
  }

  return (
    <div className="order-list-container">
  <div className="order-list-header">
    <div className="header-info">
      <h2 className="order-list-title">Pedidos</h2>
      <span className="order-count">{pedidos.length} pedidos</span>
    </div>

  <select
  className="order-status-filter"
  value={estado}
  onChange={(e) => setEstado(e.target.value)}
>
  <option value="">Todos los estados</option>
  <option value="pendiente">Pendiente</option>
  <option value="procesando">Procesando</option>
  <option value="enviado">Enviado</option>
  <option value="completado">Completado</option>
  <option value="cancelado">Cancelado</option>
</select>


  </div>

      <div className="orders-grid">
        {pedidosFiltrados.map((pedido) => {
          const usuario = pedido.usuario;
          const nombreUsuario = usuario
            ? (usuario.name || usuario.username || usuario.email || 'Usuario sin datos')
            : 'Usuario eliminado';
          const isOpen = openPedidoId === pedido._id;

          return (
            <div key={pedido._id} className="order-card-container">
              <div 
                className="order-card-header-section"
                onClick={() => togglePedido(pedido._id)}
              >
                <div className="order-header-left">
                  <div className="order-id-badge">
                    <i className="bi bi-receipt"></i>
                    #{pedido._id.substring(pedido._id.length - 6)}
                  </div>
                  <div className="order-user-info">
                    <span className="user-name">{nombreUsuario}</span>
                  </div>
                </div>

                <div className="order-header-right">
                  <span className="order-total">${Number(pedido.total || 0).toLocaleString('es-AR')}</span>
                  <span className={`order-status-badge ${getEstadoBadgeClass(pedido.estado)}`}>
                    {pedido.estado}
                  </span>
                  <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} chevron-icon`}></i>
                </div>
              </div>

              {isOpen && (
                <div className="order-card-body">
                  <div className="order-info-grid">
                    <div className="info-item">
                      <span className="info-label">Fecha</span>
                      <span className="info-value">
                        {pedido.createdAt
                          ? new Date(pedido.createdAt).toLocaleDateString('es-AR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })
                          : '—'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{usuario?.email || 'No disponible'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Items</span>
                      <span className="info-value">{pedido.items?.length || 0} productos</span>
                    </div>
                  </div>

                  {pedido.items && pedido.items.length > 0 && (
                    <div className="order-items-section">
                      <h4 className="items-title">Productos</h4>
                      <div className="order-items-list">
                        {pedido.items.map((item) => {
                          const nombreProducto = item.nombre || item.producto?.nombre || 'Producto';
                          const precioUnitario = item.precioUnitario ?? item.precio ?? item.producto?.precio ?? 0;
                          const cantidad = item.cantidad || 0;
                          const subtotal = cantidad * Number(precioUnitario || 0);

                          return (
                            <div
                              key={item._id || `${pedido._id}-${nombreProducto}`}
                              className="order-item-row"
                            >
                              <div className="item-info">
                                <span className="item-name">{nombreProducto}</span>
                                <span className="item-details">
                                  {cantidad} × ${Number(precioUnitario).toLocaleString('es-AR')}
                                </span>
                              </div>
                              <span className="item-subtotal">
                                ${Number(subtotal).toLocaleString('es-AR')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="order-actions">
                    <button
                      className="change-status-btn"
                      onClick={() => abrirModalEstado(pedido)}
                    >
                      <i className="bi bi-arrow-repeat"></i>
                      Cambiar estado
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de cambio de estado */}
      {showModal && pedidoSeleccionado && (
        <>
          <div className="modal-overlay" onClick={cerrarModal}></div>
          <div className="modal-container">
            <div className="modal-header">
              <i className="bi bi-arrow-repeat"></i>
              <h3>Cambiar estado del pedido</h3>
            </div>

            <div className="modal-body">
              <div className="modal-info-row">
                <span className="modal-label">Pedido</span>
                <span className="modal-value">
                  #{pedidoSeleccionado._id.substring(pedidoSeleccionado._id.length - 6)}
                </span>
              </div>
              <div className="modal-info-row">
                <span className="modal-label">Estado actual</span>
                <span className={`order-status-badge ${getEstadoBadgeClass(pedidoSeleccionado.estado)}`}>
                  {pedidoSeleccionado.estado}
                </span>
              </div>

              <div className="modal-select-group">
                <label className="modal-label">Nuevo estado</label>
                <select
                  className="modal-select"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  disabled={actualizandoEstado}
                >
                  <option value="">Seleccionar estado...</option>
                  {ESTADOS_PREDEFINIDOS.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-btn cancel" 
                onClick={cerrarModal}
                disabled={actualizandoEstado}
              >
                Cancelar
              </button>
              <button
                className="modal-btn confirm"
                onClick={confirmarCambioEstado}
                disabled={actualizandoEstado || !nuevoEstado}
              >
                {actualizandoEstado ? 'Guardando...' : 'Actualizar estado'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderListScreen;