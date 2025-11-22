// routes/pedidos.routes.js
import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getPedidosPropios, createPedido } from '../controllers/pedidoController.js';

export const pedidosRouter = Router();

pedidosRouter.post('/', authMiddleware, createPedido);
pedidosRouter.get('/mios', authMiddleware, getPedidosPropios);
