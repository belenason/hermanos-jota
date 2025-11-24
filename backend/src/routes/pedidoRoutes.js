// routes/pedidos.routes.js
import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminGuard from '../middlewares/adminGuard.js';
import { createPedido, getPedidos, getPedidosPropios, updateEstadoPedido  } from '../controllers/pedidoController.js';

export const pedidosRouter = Router();

pedidosRouter.post('/', authMiddleware, createPedido);
pedidosRouter.get('/mios', authMiddleware, getPedidosPropios);
pedidosRouter.get('/', authMiddleware, adminGuard, getPedidos);
pedidosRouter.put('/:id', authMiddleware, adminGuard, updateEstadoPedido);
