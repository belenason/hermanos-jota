// src/apiPedidos.js
const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

// ================================
// HELPERS DE AUTENTICACIÓN
// ================================
function getAuthToken() {
  const userInfoRaw = localStorage.getItem('userInfo');
  if (userInfoRaw) {
    try {
      const parsed = JSON.parse(userInfoRaw);
      if (parsed.token) return parsed.token;
      if (parsed.user && parsed.user.token) return parsed.user.token;
    } catch (e) {
      console.warn('No se pudo parsear userInfo', e);
    }
  }

  const fallback = localStorage.getItem('authToken');
  if (fallback) return fallback;

  throw new Error('No estás autenticado. Iniciá sesión para continuar.');
}

function getAuthHeaders(extra = {}) {
  const token = getAuthToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

// ================================
// CLIENTE
// ================================

// Crear pedido (acepta array o { items: [...] })
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

  const res = await fetch(`${API_URL}/api/pedidos`, {
    method: 'POST',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ items }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'No se pudo crear el pedido.');
  }

  return data;
}

// Obtener pedidos del usuario logueado
export async function getMisPedidos() {
  const res = await fetch(`${API_URL}/api/pedidos/mios`, {
    method: 'GET',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'No se pudieron cargar tus pedidos.');
  }

  return data;
}

// ================================
// ADMIN
// ================================

// GET todos los pedidos
export async function getPedidosAdmin() {
  const res = await fetch(`${API_URL}/api/pedidos`, {
    method: 'GET',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error al cargar pedidos.');
  }

  return data;
}

// Actualizar estado de un pedido
export async function actualizarEstadoPedido(id, estado) {
  const res = await fetch(`${API_URL}/api/pedidos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ estado }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'No se pudo actualizar el pedido.');
  }

  return data;
}
