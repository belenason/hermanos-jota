// src/apiProductos.js
const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

// Pequeño helper
function getAuthHeaders(extra = {}) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No estás autenticado. Iniciá sesión para continuar.');
  }
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
  if (!res.ok) {
    throw new Error('Error creando el producto');
  }
  const data = await res.json();
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
  if (!res.ok) throw new Error('Error actualizando el producto');
  return res.json();
}

// DELETE eliminar un producto (PROTEGIDO)
export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error eliminando el producto');
  return res.json();
}
