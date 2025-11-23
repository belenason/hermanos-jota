export default function adminGuard (req, res, next) {
  // Este middleware se ejecuta DESPUÉS del authMiddleware,
  // por lo que podemos asumir que req.user existe.
  if (req.user && req.user.rol.includes('admin')) {
    // Si el usuario existe y su array de roles incluye 'admin', le permitimos pasar.
    next();
  } else {
    // Si no, le denegamos el acceso con un error 403 (Prohibido).
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};