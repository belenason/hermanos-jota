import { Pedido } from '../models/Pedido.js';
import { Producto } from '../models/Producto.js';

// @desc    Crear un pedido nuevo
// @route   POST /api/pedidos/
const createPedido = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;
    const { items } = req.body;

    // 1. Validaciones iniciales básicas
    if (!Array.isArray(items) || items.length === 0) {
      const error = new Error('El pedido debe tener al menos un ítem.');
      error.status = 400;
      return next(error);
    }

    // 2. Extraer todos los IDs de los productos para hacer UNA sola consulta
    //    Evitamos duplicados usando Set, por si mandan el mismo ID dos veces
    const productoIds = [...new Set(items.map(item => item.productoId))];

    // 3. Consultamos TODOS los productos en un solo viaje a la BD
    const productosEncontrados = await Producto.find({ _id: { $in: productoIds } });

    // 4. Creamos un "Mapa" para acceso rápido (O(1))
    //    Esto nos permite buscar productos por ID instantáneamente sin recorrer arrays
    const mapaProductos = new Map();
    productosEncontrados.forEach(prod => {
      mapaProductos.set(prod._id.toString(), prod);
    });

    let total = 0;
    const itemsNormalizados = [];

    // 5. Procesamos el pedido en memoria
    for (const item of items) {
      const { productoId, cantidad } = item;

      // Validación de datos del item
      if (!productoId || !cantidad || cantidad <= 0) {
        const error = new Error('Cada ítem debe tener productoId y cantidad mayor a 0.');
        error.status = 400;
        return next(error);
      }

      // Buscamos en nuestro mapa (memoria) en lugar de la BD
      const productoDB = mapaProductos.get(productoId);

      // Si no existe en el mapa, es que el ID era inválido o no existe en la BD
      if (!productoDB) {
        const error = new Error(`Producto no encontrado con ID: ${productoId}`);
        error.status = 404;
        return next(error);
      }

      // Calculamos
      const precioUnitario = productoDB.precio;
      total += precioUnitario * cantidad;

      itemsNormalizados.push({
        producto: productoDB._id,
        nombre: productoDB.nombre,
        precioUnitario,
        cantidad,
      });
    }

    // 6. Guardamos el pedido
    const nuevoPedido = new Pedido({
      usuario: usuarioId,
      items: itemsNormalizados,
      total,
      estado: 'pendiente',
    });

    const pedidoGuardado = await nuevoPedido.save();

    res.status(201).json(pedidoGuardado);

  } catch (error) {
    console.error('Error al crear pedido:', error);
    // Manejo de error de CastError (IDs inválidos de MongoDB)
    if (error.name === 'CastError') {
       error.status = 400;
       error.message = 'Uno de los IDs de producto no es válido.';
    } else {
       error.status = 500;
    }
    next(error);
  }
}

// @desc    Traer todos los pedidos
// @route   GET /api/pedidos
const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({}).populate('usuario', 'id username email'); 
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    error.status = 500;
    next(error); 
  }
}

// @desc    Traer pedidos propios
// @route   GET /api/pedidos/mios
const getPedidosPropios = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;

    const pedidos = await Pedido.find({ usuario: usuarioId })
      .sort({ createdAt: -1 });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    error.status = 500;
    next(error); 
  }
}

// @desc    Actualizar el estado de un pedido
// @route   PUT /api/pedidos/:id
const updateEstadoPedido = async (req, res, next) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Leemos los valores permitidos directamente del Modelo.
  const estadosValidos = Pedido.schema.path('estado').enumValues;

  // Validamos que el estado enviado esté en esa lista
  if (!estado || !estadosValidos.includes(estado)) {
    const error = new Error(
      `Estado inválido. Los estados permitidos son: ${estadosValidos.join(', ')}`
    );
    error.status = 400;
    return next(error);
  }

  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true } 
    );

    if (!pedidoActualizado) {
      const error = new Error('Pedido no encontrado');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: `El pedido ha pasado a estado: ${estado}`,
      pedido: pedidoActualizado
    });

  } catch (error) {
    console.error('Error al actualizar estado:', error);
    
    // Si falla por ID malformado
    if (error.name === 'CastError') {
      error.status = 400;
      error.message = 'ID de pedido inválido';
    } else {
      error.status = 500;
    }
    next(error);
  }
}


export { createPedido, getPedidos, getPedidosPropios, updateEstadoPedido };