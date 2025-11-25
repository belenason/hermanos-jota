import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminGuard from "../middlewares/adminGuard.js";
import { getProductos, getProducto, updateProducto, createProducto, deleteProducto } from "../controllers/productoController.js";


export const productosRouter = Router();


productosRouter.get("/", getProductos);
productosRouter.get("/:id", getProducto);
productosRouter.post('/', authMiddleware, adminGuard, createProducto);
productosRouter.put('/:id', authMiddleware, adminGuard, updateProducto);
productosRouter.delete('/:id', authMiddleware, adminGuard, deleteProducto);
