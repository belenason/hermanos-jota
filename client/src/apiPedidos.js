// src/apiPedidos.js
import { apiGet, apiPost, apiPut } from './utils/apiClient';

// ================================
// CLIENTE
// ================================

export async function crearPedido(itemsOrPayload) {
  let items = [];

  if (Array.isArray(itemsOrPayload)) {
    // crearPedido([ ...items ])
    items = itemsOrPayload;
  } else if (
    itemsOrPayload &&
    Array.isArray(itemsOrPayload.items)
  ) {
    // crearPedido({ items: [ ...items ] })
    items = itemsOrPayload.items;
  } else {
    throw new Error('No se pudieron procesar los ítems del pedido.');
  }

  return apiPost('/api/pedidos', { items }, {
    auth: true, // PROTEGIDO
  });
}

// Obtener pedidos del usuario logueado
export async function getMisPedidos() {
  return apiGet('/api/pedidos/mios', {
    auth: true, // PROTEGIDO
  });
}

// ================================
// ADMIN
// ================================

// GET todos los pedidos
export async function getPedidosAdmin() {
  return apiGet('/api/pedidos', {
    auth: true, // PROTEGIDO
  });
}

// Actualizar estado de un pedido
export async function actualizarEstadoPedido(id, estado) {
  return apiPut(`/api/pedidos/${id}`, { estado }, {
    auth: true, // PROTEGIDO
  });
}
