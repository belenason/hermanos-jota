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

// --- Debug: loguear origin/method al principio ---
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.originalUrl, "Origin:", req.headers.origin || "(no origin)");
  next();
});

// --- CORS (antes que TODO) ---
const allowedExact = new Set([
  "http://localhost:3000",
  "https://hermanos-jota.vercel.app",
]);

function isAllowedOrigin(origin) {
  if (!origin) return true; // Postman/SSR
  try {
    const u = new URL(origin);
    if (u.protocol !== "https:" && u.hostname !== "localhost") return false;
    if (allowedExact.has(origin)) return true;
    // permitir previews de Vercel del mismo proyecto
    return u.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

const corsOptions = {
  origin: (origin, cb) => {
    if (isAllowedOrigin(origin)) return cb(null, true);
    // Importante: no mandes error aquí para no “saltar” CORS y perder headers;
    // devolvemos false para que la lib maneje el preflight sin romper.
    return cb(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// Aplica CORS global
app.use(cors(corsOptions));
// Asegura responder preflight de TODO
app.options("*", cors(corsOptions));

// --- Resto de middlewares ---
app.use(express.json());
app.use(logger);

// --- Rutas ---
app.use("/api/productos", productosRouter);

// 404
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Error handler (deja que CORS ya haya inyectado headers)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error("ERROR:", err.message);
  res.status(statusCode).json({
    message: err.message || "Ha ocurrido un error en el servidor.",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// Start
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
