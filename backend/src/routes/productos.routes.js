import { Router } from "express";
import { PRODUCTS } from "../data/productos.js";

export const productosRouter = Router();

// GET /api/productos
productosRouter.get("/", (req, res) => {
  res.json(PRODUCTS);
});

// GET /api/productos/:id
productosRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = PRODUCTS.find(p => p.id === id);
  if (!found) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(found);
});
