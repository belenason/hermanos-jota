import asyncHandler from 'express-async-handler';
import { Producto } from '../models/Producto.js';

// @desc    Obtener todos los productos
// @route   GET /api/productos
 const getProductos = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const filtro = {};

  // Filtrar por precio mínimo
  if (minPrice) {
    filtro.precio = { ...filtro.precio, $gte: Number(minPrice) };
  }

  // Filtrar por precio máximo
  if (maxPrice) {
    filtro.precio = { ...filtro.precio, $lte: Number(maxPrice) };
  }

  const productos = await Producto.find(filtro);
  res.json(productos);
});

// @desc    Obtener un producto determinado por su ID
// @route   GET /api/productos/:id
const getProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Nota: Si el ID tiene un formato inválido, Mongoose lanzará un CastError aquí mismo.
  // El asyncHandler lo atrapará y lo enviará al middleware de error.
  const producto = await Producto.findById(id);

  if (!producto) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  res.status(200).json(producto);
});


// @desc    Crear un nuevo producto
// @route   POST /api/productos
const createProducto = asyncHandler(async (req, res) => {
  const datosNuevoProducto = req.body;

  const nuevoProducto = new Producto(datosNuevoProducto);
  const productoGuardado = await nuevoProducto.save();

  res.status(201).json({
    mensaje: 'Producto creado con éxito',
    producto: productoGuardado
  });
});

// @desc    Actualizar un producto por su ID
// @route   PUT /api/productos/:id
const updateProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    datosActualizados,
    { new: true, runValidators: true }
  );

  if (!productoActualizado) {
    res.status(404);
    throw new Error('Producto no encontrado para actualizar');
  }

  res.status(200).json({
    mensaje: 'Producto actualizado con éxito',
    producto: productoActualizado
  });
});

// @desc    Eliminar un producto por su ID
// @route   DELETE /api/productos/:id
const deleteProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const productoEliminado = await Producto.findByIdAndDelete(id);

  if (!productoEliminado) {
    res.status(404);
    throw new Error('Producto no encontrado para eliminar');
  }

  res.status(200).json({
    mensaje: 'Producto eliminado con éxito',
    producto: productoEliminado
  });
});

export { 
  getProductos, 
  getProducto, 
  createProducto, 
  updateProducto, 
  deleteProducto 
};