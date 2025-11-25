// routes/usuarioRoutes.js

import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { register, login, getProfile, getUsers, changeUserRole } from '../controllers/usuarioController.js';
import adminGuard from "../middlewares/adminGuard.js";

export const usuariosRouter = Router();
 
usuariosRouter.post('/registro', register);
usuariosRouter.post('/login', login);
usuariosRouter.get('/perfil', authMiddleware, getProfile);
usuariosRouter.get('/usuarios', authMiddleware, adminGuard, getUsers);
usuariosRouter.put('/usuarios/:id', authMiddleware, adminGuard, changeUserRole);