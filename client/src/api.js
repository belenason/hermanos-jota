export async function getProductos() {
  const res = await fetch('http://localhost:4000/api/productos');
  if (!res.ok) throw new Error('Error cargando productos');
  return res.json();
}
