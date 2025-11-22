// apiPedidos.js
const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

// Crear un pedido nuevo
export async function crearPedido(token, items) {
  const res = await fetch(`${API_URL}/api/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'No se pudo crear el pedido.');
  }

  return data;
}

// Obtener pedidos del usuario logueado
export async function getMisPedidos(token) {
  const res = await fetch(`${API_URL}/api/pedidos/mios`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'No se pudieron cargar tus pedidos.');
  }

  return data;
}
