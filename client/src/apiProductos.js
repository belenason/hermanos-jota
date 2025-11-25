// src/apiProductos.js
import { apiGet, apiPost, apiPut, apiDelete } from './utils/apiClient';

// GET todos los productos (público)
export async function getProductos() {
  return apiGet('/api/productos', {
    auth: false,
  });
}

// GET un producto por ID (público)
export async function getProductoById(id) {
  return apiGet(`/api/productos/${id}`, {
    auth: false,
  });
}

// POST crear un producto (PROTEGIDO)
export async function createProducto(productData) {
  const data = await apiPost('/api/productos', productData, {
    auth: true,
  });

  // Normalizamos un poco (como hacías antes)
  return { ...data.producto, id: data.producto._id };
}

// PUT actualizar un producto (PROTEGIDO)
export async function updateProducto(id, productData) {
  return apiPut(`/api/productos/${id}`, productData, {
    auth: true,
  });
}

// DELETE eliminar un producto (PROTEGIDO)
export async function deleteProducto(id) {
  return apiDelete(`/api/productos/${id}`, {
    auth: true,
  });
}
