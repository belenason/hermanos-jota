import { Usuario } from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc    Registrar un usuario nuevo
// @route   POST /api/usuarios/registro
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validación básica
  if (!password || password.length < 8) {
    const error = new Error('La contraseña debe tener al menos 8 caracteres.');
    error.status = 400;
    return next(error);
  }

  try {
    // Verificamos si el usuario o email ya existen
    const usuarioExiste = await Usuario.findOne({ $or: [{ email }, { username }] });
    
    if (usuarioExiste) {
      const error = new Error('El email o nombre de usuario ya está en uso.');
      error.status = 400;
      return next(error);
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
 
  } catch (error) {
    console.error('Error en registro:', error);
    error.status = 500;
    next(error);
  }
}

// @desc    Iniciar sesión
// @route   POST /api/usuarios/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscamos al usuario por su email
    const user = await Usuario.findOne({ email }).select('+password');
    
    // Validación de usuario existente
    if (!user) {
      const error = new Error('Credenciales inválidas');
      error.status = 401; // Unauthorized
      return next(error);
    }
    
    // Validación de contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      const error = new Error('Credenciales inválidas');
      error.status = 401; // Unauthorized
      return next(error);
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
 
  } catch (error) {
    console.error('Error en login:', error);
    error.status = 500;
    next(error);
  }
}

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/usuarios/perfil
const getProfile = async (req, res, next) => {
  try {
    // Asumimos que el middleware de auth ya puso req.user
    const usuario = await Usuario.findById(req.user.id);

    if (!usuario) {
      const error = new Error('Usuario no encontrado.');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      _id: usuario._id,
      username: usuario.username,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    error.status = 500;
    next(error);
  }
}

// @desc    Obtener todos los usuarios
// @route   GET /api/usuarios/
const getUsers = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find({});
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    error.status = 500;
    next(error); 
  }
}

// @desc    Cambiar el rol de un usuario (Admin)
// @route   PUT /api/usuarios/:id
const changeUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { rol } = req.body; 

  const rolesPermitidos = ['cliente', 'admin'];
  
  if (!rol || !rolesPermitidos.includes(rol)) {
    const error = new Error(`Rol no válido. Los roles permitidos son: ${rolesPermitidos.join(', ')}`);
    error.status = 400;
    return next(error);
  }

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      id, 
      { roles: [rol] }, 
      { new: true, runValidators: true } 
    );

    if (!usuario) {
      const error = new Error('Usuario no encontrado.');
      error.status = 404;
      return next(error);
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

  } catch (error) {
    console.error('Error al cambiar rol:', error);
    // Si falla por formato de ID inválido
    if (error.name === 'CastError') {
        error.status = 400;
    } else {
        error.status = 500;
    }
    next(error);
  }
}

export { register, login, getProfile, getUsers, changeUserRole };