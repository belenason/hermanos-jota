/**
 * Configuración de la aplicación Express
 */
const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger.middleware');
const productosRoutes = require('./routes/productos.routes');

const app = express();

// ==========================================
// MIDDLEWARES GLOBALES
// ==========================================

// CORS - Permitir peticiones desde el frontend React
app.use(cors({
  origin: 'http://localhost:3000', // URL del frontend React
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parser de JSON
app.use(express.json());

// Middleware de logging personalizado
app.use(logger);

// ==========================================
// RUTAS
// ==========================================

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Hermanos Jota - E-commerce de Muebles',
    version: '1.0.0',
    endpoints: {
      productos: '/api/productos',
      productoById: '/api/productos/:id'
    }
  });
});

// Rutas de productos
app.use('/api/productos', productosRoutes);

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// Manejador 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `No se encontró la ruta ${req.method} ${req.url}`,
    availableRoutes: [
      'GET /',
      'GET /api/productos',
      'GET /api/productos/:id'
    ]
  });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
