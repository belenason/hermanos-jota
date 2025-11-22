import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getProductos, getProducto, updateProducto, createProducto, deleteProducto } from "../controllers/productoController.js";


export const productosRouter = Router();


productosRouter.get("/", getProductos);
productosRouter.get("/:id", getProducto);
productosRouter.post('/', authMiddleware, createProducto);
productosRouter.put('/:id', authMiddleware, updateProducto);
productosRouter.delete('/:id', authMiddleware, deleteProducto);
