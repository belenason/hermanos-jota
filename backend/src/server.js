// backend/src/server.js
import express from "express";
import { logger } from "./middlewares/logger.js";
import { productosRouter } from "./routes/productos.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());        // consigna sugiere incluirlo
app.use(logger);                // logger simple
app.use(cors());             

// Rutas API
app.use("/api/productos", productosRouter);

// 404 para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador central de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
