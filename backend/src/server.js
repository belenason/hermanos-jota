// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js";
import { logger } from "./middlewares/logger.js";
import { productosRouter } from "./routes/productos.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// === CORS ===
// 🔹 Agregá acá el dominio real de tu frontend en Vercel:
const allowedOrigins = [
  "http://localhost:3000",
  "https://hermanosjota.vercel.app", // 👈 reemplazá por tu dominio real
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sin origin (Postman, SSR, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Origen no permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
