// apiProductos.js
const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

// GET todos los productos
export async function getProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error('Error cargando productos');
  return res.json();
}

// GET un producto por ID
export async function getProductoById(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`);
  if (!res.ok) throw new Error('Error cargando el producto');
  return res.json();
}

// POST crear un producto
export async function createProducto(productData) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error creando el producto');
  const data = await res.json();
  return { ...data.producto, id: data.producto._id };
}

// PUT actualizar un producto
export async function updateProducto(id, productData) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error actualizando el producto');
  return res.json();
}

// DELETE eliminar un producto
export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error eliminando el producto');
  return res.json();
}

