// src/apiProductos.js
const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

// Helper para sacar el token de localStorage de forma robusta
function getAuthToken() {
  // Intentamos con userInfo (respuesta del login)
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

  // Fallback a una posible clave "authToken"
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

// GET todos los productos (público)
export async function getProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error('Error cargando productos');
  return res.json();
}

// GET un producto por ID (público)
export async function getProductoById(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`);
  if (!res.ok) throw new Error('Error cargando el producto');
  return res.json();
}

// POST crear un producto (PROTEGIDO)
export async function createProducto(productData) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: 'POST',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error creando el producto');
  }
  // Normalizamos un poco
  return { ...data.producto, id: data.producto._id };
}

// PUT actualizar un producto (PROTEGIDO)
export async function updateProducto(id, productData) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error actualizando el producto');
  return data;
}

// DELETE eliminar un producto (PROTEGIDO)
export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error eliminando el producto');
  return data;
}
