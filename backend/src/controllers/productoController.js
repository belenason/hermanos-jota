import { Producto } from '../models/Producto.js';

// @desc    Obtener todos los productos
// @route   GET /api/productos
const getProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    error.status = 500; // Error del servidor
    next(error); 
  }
}

// @desc    Obtener un producto determinado por su ID
// @route   GET /api/productos/:id
const getProducto = async (req, res, next) => {
  try {
    const { id } = req.params; // Desestructuración más limpia
    console.log('Buscando producto con ID:', id);

    const producto = await Producto.findById(id);

    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      return next(error); 
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al buscar producto por ID:', error.message);
    // Si es error de "CastError" (ID con formato inválido), es un 400. Si no, asumimos 500.
    error.status = error.name === 'CastError' ? 400 : 500; 
    next(error);
  }
}

// @desc    Crear un nuevo producto
// @route   POST /api/productos
const createProducto = async (req, res, next) => {
  try {
    const datosNuevoProducto = req.body;
    console.log('Datos recibidos para crear producto:', datosNuevoProducto);

    const nuevoProducto = new Producto(datosNuevoProducto);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json({
      mensaje: 'Producto creado con éxito',
      producto: productoGuardado
    });

  } catch (error) {
    console.error('Error al crear el producto:', error.message);
    // Mongoose lanza ValidationError si faltan datos requeridos
    error.status = error.name === 'ValidationError' ? 400 : 500; 
    next(error);
  }
}

// @desc    Actualizar un producto por su ID
// @route   PUT /api/productos/:id
const updateProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    console.log(`Actualizando producto con ID ${id} con datos:`, datosActualizados);

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      const error = new Error('Producto no encontrado para actualizar');
      error.status = 404;
      return next(error);
    }
 
    res.status(200).json({
      mensaje: 'Producto actualizado con éxito',
      producto: productoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    const isInputError = error.name === 'CastError' || error.name === 'ValidationError';
    error.status = isInputError ? 400 : 500;
    next(error);
  }
}

// @desc    Eliminar un producto por su ID
// @route   DELETE /api/productos/:id
const deleteProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Eliminando producto con ID:', id);
 
    const productoEliminado = await Producto.findByIdAndDelete(id);
 
    if (!productoEliminado) {
      const error = new Error('Producto no encontrado para eliminar');
      error.status = 404;
      return next(error);
    }
 
    res.status(200).json({
      mensaje: 'Producto eliminado con éxito',
      producto: productoEliminado 
    });
 
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    error.status = error.name === 'CastError' ? 400 : 500;
    next(error);
  }
}

export {getProductos, getProducto, updateProducto, createProducto, deleteProducto};