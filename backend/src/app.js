import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.routes.js';
import logger from './middlewares/logger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/productos', productsRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

export default app;
