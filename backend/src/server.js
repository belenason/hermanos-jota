// backend/src/server.js
import express from "express";
import { logger } from "./middlewares/logger.js";
import { productosRouter } from "./routes/productos.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(logger);
app.use(cors());     

// Rutas API
app.use("/api/productos", productosRouter);

// 404 para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error); // Se lo pasamos a nuestro manejador de errores central
});

// Manejador central de errores
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({
    message: err.message || 'Ha ocurrido un error en el servidor.',
    // Solo mostramos el detalle del error si no estamos en producción
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
