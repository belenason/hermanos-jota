export async function getProductos() {
  const res = await fetch('/api/productos');
  if (!res.ok) throw new Error('Error cargando productos');
  return res.json();
}
