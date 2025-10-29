import express from "express";
import mongoose from "mongoose";
import { logger } from "./middlewares/logger.js";
import { productosRouter } from "./routes/productos.routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('¡Conexión exitosa a MongoDB! ✅');
  } catch (error) {

    console.error('Error al conectar a MongoDB: ❌', error);
    // Si la conexión falla, es un error fatal, salimos del proceso
    process.exit(1);
  }
};

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
  next(error);
});

// Manejador central de errores
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err.message); // No es necesario imprimir el stack en cada error
  res.status(statusCode).json({
    message: err.message || 'Ha ocurrido un error en el servidor.',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});


const startServer = async () => {
  try {
    // 1. Conectar a la base de datos y ESPERAR a que termine
    await conectarDB();

    // 2. SOLO SI la conexión es exitosa, iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en el puerto ${PORT} 🚀`);
    });

  } catch (error) {
    // Este catch es por si acaso, aunque conectarDB ya tiene el suyo
    console.error("Error fatal al arrancar el servidor: ", error.message);
    process.exit(1);
  }
};

// Llamamos a la función para iniciar todo
startServer();