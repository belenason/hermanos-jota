import { Router } from "express";
import { PRODUCTS } from "../data/productos.js";

export const productosRouter = Router();

// FALTA: LOS ENDPOINTS MARCADOS Y MODIFICAR LOS HECHOS PARA Q SE CONECTEN A LA BD

// GET /api/productos
productosRouter.get("/", (req, res) => {
  res.json(PRODUCTS);
});

// GET /api/productos/:id
productosRouter.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const producto = PRODUCTS.find(p => p.id === id);
  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    return next(error); 
  }
  res.json(producto);
});

// POST /api/productos: Recibe los datos de un nuevo producto en req.body, crea un nuevo documento en la base de datos y lo devuelve con un estado 201.
productosRouter.post('/', (req, res, next) => {
  const nuevoProducto = req.body; 
  console.log('Producto recibido:', nuevoProducto);

  if (!nuevoProducto.nombre || !nuevoProducto.precio) {
    const error = new Error('Nombre y precio son obligatorios');
    error.status = 400;
    return next(error);
  }
 
  // Aquí iría la lógica para guardar en la base de datos...
  
  res.status(201).json({ 
    mensaje: 'Producto creado con éxito', 
    producto: nuevoProducto 
  });
});

// PUT /api/productos/:id: Recibe datos actualizados en req.body y modifica el producto correspondiente en la base de datos.

// DELETE /api/productos/:id: Elimina un producto de la base de datos por su _id.
