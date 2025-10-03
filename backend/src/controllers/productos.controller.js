/**
 * Controlador de productos
 * Maneja la lógica de negocio para las operaciones de productos
 */
const PRODUCTS = require('../data/productos');

/**
 * Obtiene todos los productos
 * GET /api/productos
 */
const getAllProductos = (req, res) => {
  try {
    console.log('✅ Enviando todos los productos:', PRODUCTS.length);
    res.json(PRODUCTS);
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
};

/**
 * Obtiene un producto por ID
 * GET /api/productos/:id
 */
const getProductoById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        error: 'ID inválido',
        message: 'El ID debe ser un número' 
      });
    }
    
    const producto = PRODUCTS.find(p => p.id === id);
    
    if (!producto) {
      console.log(`⚠️  Producto con ID ${id} no encontrado`);
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: `No existe un producto con ID ${id}` 
      });
    }
    
    console.log(`✅ Producto encontrado: ${producto.nombre}`);
    res.json(producto);
    
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
};

module.exports = {
  getAllProductos,
  getProductoById
};
