import { Usuario } from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc    Registrar un usuario nuevo
// @route   POST /api/usuarios/registro
const register = async (req, res) => {
  // Recibimos los datos del formulario
  const { username, email, password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
  }

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
}

// @desc    Iniciar sesión
// @route   POST /api/usuarios/login
const login = async (req, res) => {
  try {
    // Buscamos al usuario por su email
    const user = await Usuario.findOne({ email: req.body.email }).select('+password');;
    if (!user) {
      // Usamos un mensaje genérico por seguridad
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
 
    // Comparamos la contraseña enviada con la hasheada en la BD
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
 
    // Si las credenciales son correctas, generamos el JWT
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Payload: datos que queremos en el token
      process.env.JWT_SECRET,                   // La clave secreta desde .env
      { expiresIn: '7d' }                        // Opciones (ej: expira en 1 hora)
    );
 
    // Respondemos con el token y datos del usuario (sin el password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
 
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// @desc    Obtener perfil del usuario autenticado
// @route   POST /api/usuarios/perfil
const getProfile = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
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
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export { register, login, getProfile };