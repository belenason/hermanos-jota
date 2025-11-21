// routes/usuarioRoutes.js

import { Router } from "express";
import { Usuario } from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const usuariosRouter = Router();
 
// RUTA DE REGISTRO
usuariosRouter.post('/registro', async (req, res) => {
  // Recibimos los datos del formulario
  const { username, email, password } = req.body;
  try {

    // Verificamos si el usuario o email ya existen
    const usuarioExiste = await Usuario.findOne({ $or: [{ email }, { username }] });
    if (usuarioExiste) {
      return res.status(400).json({ message: 'El email o nombre de usuario ya está en uso.' });
    }
 
    // Hasheamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    // Creamos el nuevo usuario con la contraseña hasheada
    const nuevoUsuario = new Usuario({
      username,
      email,
      password: hashedPassword,
    });
 
    // Guardamos el usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();
 
    // Respondemos al frontend (sin enviar la contraseña)
    res.status(201).json({
      _id: usuarioGuardado._id,
      username: usuarioGuardado.username,
      email: usuarioGuardado.email,
    });
 
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
});
 