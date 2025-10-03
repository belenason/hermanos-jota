/**
 * Servicio de productos
 * Maneja todas las peticiones HTTP relacionadas con productos
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Obtiene todos los productos desde la API
 * @returns {Promise<Array>} Array de productos
 */
export const getAllProductos = async () => {
  try {
    console.log('🔄 Obteniendo todos los productos...');
    
    const response = await fetch(`${API_BASE_URL}/api/productos`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    
    const productos = await response.json();
    console.log('✅ Productos obtenidos:', productos.length);
    
    return productos;
    
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    throw new Error('No se pudieron cargar los productos. Por favor, intenta nuevamente.');
  }
};

/**
 * Obtiene un producto específico por ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 */
export const getProductoById = async (id) => {
  try {
    console.log(`🔄 Obteniendo producto ID: ${id}...`);
    
    const response = await fetch(`${API_BASE_URL}/api/productos/${id}`);
    
    if (response.status === 404) {
      throw new Error('Producto no encontrado');
    }
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    
    const producto = await response.json();
    console.log('✅ Producto obtenido:', producto.nombre);
    
    return producto;
    
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    throw error;
  }
};

/**
 * Busca productos por término de búsqueda (filtrado en el cliente)
 * @param {Array} productos - Array de productos
 * @param {string} query - Término de búsqueda
 * @returns {Array} Productos filtrados
 */
export const searchProductos = (productos, query) => {
  if (!query || query.trim() === '') {
    return productos;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return productos.filter(producto => {
    const nombre = producto.nombre?.toLowerCase() || '';
    const descripcion = producto.descripcion?.toLowerCase() || '';
    
    return nombre.includes(searchTerm) || descripcion.includes(searchTerm);
  });
};

export default {
  getAllProductos,
  getProductoById,
  searchProductos
};
