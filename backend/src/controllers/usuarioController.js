import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';

// @desc    Registrar un usuario nuevo
// @route   POST /api/usuarios/registro
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validación básica
  if (!password || password.length < 8) {
    res.status(400);
    throw new Error('La contraseña debe tener al menos 8 caracteres.');
  }

  // Verificamos si el usuario o email ya existen
  const usuarioExiste = await Usuario.findOne({ $or: [{ email }, { username }] });
  
  if (usuarioExiste) {
    res.status(400);
    throw new Error('El email o nombre de usuario ya está en uso.');
  }

  // Hasheamos la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const nuevoUsuario = new Usuario({
    username,
    email,
    password: hashedPassword,
  });

  const usuarioGuardado = await nuevoUsuario.save();

  res.status(201).json({
    _id: usuarioGuardado._id,
    username: usuarioGuardado.username,
    email: usuarioGuardado.email,
    rol: usuarioGuardado.roles,
  });
});

// @desc    Iniciar sesión
// @route   POST /api/usuarios/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Buscamos al usuario por su email
  const user = await Usuario.findOne({ email }).select('+password');
  
  // Validación de usuario existente
  if (!user) {
    res.status(401); // Unauthorized
    throw new Error('Credenciales inválidas');
  }
  
  // Validación de contraseña
  const isValidPassword = await bcrypt.compare(password, user.password);
  
  if (!isValidPassword) {
    res.status(401); // Unauthorized
    throw new Error('Credenciales inválidas');
  }

  // Generamos el JWT
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email, rol: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      rol: user.roles,
    },
  });
});

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/usuarios/perfil
const getProfile = asyncHandler(async (req, res) => {
  // Asumimos que el middleware de auth ya puso req.user
  const usuario = await Usuario.findById(req.user.id);

  if (!usuario) {
    res.status(404);
    throw new Error('Usuario no encontrado.');
  }

  res.status(200).json({
    _id: usuario._id,
    username: usuario.username,
    email: usuario.email,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
  });
});

// @desc    Obtener todos los usuarios
// @route   GET /api/usuarios/
const getUsers = asyncHandler(async (req, res) => {
  const usuarios = await Usuario.find({});
  res.status(200).json(usuarios);
});

// @desc    Cambiar el rol de un usuario (Admin)
// @route   PUT /api/usuarios/:id
const changeUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body; 

  const rolesPermitidos = ['cliente', 'admin'];
  
  if (!rol || !rolesPermitidos.includes(rol)) {
    res.status(400);
    throw new Error(`Rol no válido. Los roles permitidos son: ${rolesPermitidos.join(', ')}`);
  }

  const usuario = await Usuario.findByIdAndUpdate(
    id, 
    { roles: [rol] }, 
    { new: true, runValidators: true } 
  );

  if (!usuario) {
    res.status(404);
    throw new Error('Usuario no encontrado.');
  }

  res.status(200).json({
    message: 'Rol actualizado exitosamente',
    user: {
      id: usuario._id,
      username: usuario.username,
      email: usuario.email,
      roles: usuario.roles, 
    }
  });
});

const updateProfile = async (req, res) => {
  const userId = req.user.id; // viene del token
  const { username, email, password, currentPassword } = req.body;

 const user = await Usuario.findById(userId).select('+password');

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado.' });
  }

  const updates = {};

  if (username) updates.username = username.trim();
  if (email) updates.email = email.trim();

  if (password) {
    // Validar que se envió la contraseña actual
    if (!currentPassword) {
      return res.status(400).json({ message: 'Debes ingresar la contraseña actual para cambiarla.' });
    }

    // Verificar que currentPassword coincida
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener mínimo 8 caracteres.' });
    }

    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(password, salt);
  }

  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password'); // oculto pass

  res.status(200).json({
    message: 'Usuario actualizado exitosamente',
    user: {
      id: usuarioActualizado._id,
      username: usuarioActualizado.username,
      email: usuarioActualizado.email,
      roles: usuarioActualizado.roles,
    }
  });
};



export { register, login, getProfile, getUsers, changeUserRole, updateProfile };