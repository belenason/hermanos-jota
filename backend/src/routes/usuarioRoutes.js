// routes/usuarioRoutes.js

import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { register, login, getProfile } from '../controllers/usuarioController.js';

export const usuariosRouter = Router();
 
usuariosRouter.post('/registro', register);
usuariosRouter.post('/login', login);
usuariosRouter.get('/perfil', authMiddleware, getProfile)