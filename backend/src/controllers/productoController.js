import { Producto } from '../models/Producto.js';

// @desc    Obtener todos los productos
// @route   GET /api/productos
const getProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    next(error); // Pasa el error al middleware de errores
  }
}

// @desc    Obtener un producto determinado por su ID
// @route   GET /api/productos/:id
const getProducto = async (req, res, next) => {
  try {
    const productoId = req.params.id;
    console.log('Buscando producto con ID:', productoId);

    const producto = await Producto.findById(productoId);

    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      return next(error); 
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al buscar producto por ID:', error.message);
    error.status = 400; // Generalmente, un ID malformado es un Bad Request (400)
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
      producto: productoGuardado // Enviamos el documento completo con el _id generado por MongoDB
    });

  } catch (error) {
    console.error('Error al crear el producto:', error.message);
    error.status = 400; // Generalmente, un error de validación es un Bad Request (400)
    next(error);
  }
}

// @desc    Actualizar un producto por su ID
// @route   PUT /api/productos/:id
const updateProducto = async (req, res, next) => {
  try {
    const productoId = req.params.id;
    const datosActualizados = req.body;
    console.log(`Actualizando producto con ID ${productoId} con datos:`, datosActualizados);

    const productoActualizado = await Producto.findByIdAndUpdate(
      productoId,
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
    error.status = 400;
    next(error);
  }
}

// @desc    Eliminar un producto por su ID
// @route   DELETE /api/productos/:id
const deleteProducto = async (req, res, next) => {
  try {
    const productoId = req.params.id;
    console.log('Eliminando producto con ID:', productoId);
 
    const productoEliminado = await Producto.findByIdAndDelete(productoId);
 
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
    error.status = 400; // Puede ser por un ID malformado
    next(error);
  }
}

export {getProductos, getProducto, updateProducto, createProducto, deleteProducto};