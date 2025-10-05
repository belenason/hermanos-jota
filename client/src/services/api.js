export async function fetchProducts() {
  const res = await fetch('/api/productos');
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`/api/productos/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
}
