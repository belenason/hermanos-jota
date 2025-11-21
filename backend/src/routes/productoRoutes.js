import { Router } from "express";
import { Producto } from "../models/Producto.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";


export const productosRouter = Router();

// Ruta para LEER todos los productos
// Método HTTP: GET
// URL: /api/productos
productosRouter.get("/", async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    next(error); // Pasa el error al middleware de errores
  }
});


// Ruta para LEER un producto por su ID
// Método HTTP: GET
// URL: /api/productos/:id
productosRouter.get("/:id", async (req, res, next) => {
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
});

// Ruta para CREAR un nuevo producto
// Método HTTP: POST
// URL: /api/productos
productosRouter.post('/', authMiddleware, async (req, res, next) => {
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
});

// Ruta para ACTUALIZAR un producto por su ID
// Método HTTP: PUT
// URL: /api/produtos/:id
productosRouter.put('/:id', authMiddleware, async (req, res, next) => {
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
});

// Ruta para ELIMINAR un producto por su ID
// Método HTTP: DELETE
// URL: /api/productos/:id
// DELETE /api/productos/:id: Elimina un producto de la base de datos por su _id.
productosRouter.delete('/:id', authMiddleware, async (req, res, next) => {
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
});
