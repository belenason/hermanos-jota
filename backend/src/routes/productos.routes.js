import { Router } from "express";
import { PRODUCTS } from "../data/productos.js";

export const productosRouter = Router();

// GET /api/productos
productosRouter.get("/", (req, res) => {
  res.json(PRODUCTS);
});

// GET /api/productos/:id
productosRouter.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const producto = PRODUCTS.find(p => p.id === id);
  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    return next(error); 
  }
  res.json(producto);
});
