// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js";
import { logger } from "./middlewares/logger.js";
import { productosRouter } from "./routes/productoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// === Middlewares ===
app.use(express.json());
app.use(logger);

// === Rutas API ===
app.use("/api/productos", productosRouter);

// === 404 para rutas no encontradas ===
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// === Manejador central de errores ===
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err.message);
  res.status(statusCode).json({
    message: err.message || "Ha ocurrido un error en el servidor.",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// === Iniciar servidor ===
const startServer = async () => {
  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en el puerto ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Error fatal al arrancar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
