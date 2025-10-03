/**
 * Rutas de productos
 * Define los endpoints de la API para productos
 */
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// GET /api/productos - Obtener todos los productos
router.get('/', productosController.getAllProductos);

// GET /api/productos/:id - Obtener un producto por ID
router.get('/:id', productosController.getProductoById);

module.exports = router;
