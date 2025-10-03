/**
 * Punto de entrada del servidor
 * Inicia el servidor Express en el puerto configurado
 */
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor de Hermanos Jota iniciado');
  console.log('='.repeat(50));
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📅 Fecha: ${new Date().toLocaleString('es-AR')}`);
  console.log('='.repeat(50));
  console.log('Endpoints disponibles:');
  console.log(`  GET  http://localhost:${PORT}/`);
  console.log(`  GET  http://localhost:${PORT}/api/productos`);
  console.log(`  GET  http://localhost:${PORT}/api/productos/:id`);
  console.log('='.repeat(50));
});
