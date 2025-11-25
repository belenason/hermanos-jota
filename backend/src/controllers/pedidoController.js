import asyncHandler from 'express-async-handler';
import { Pedido } from '../models/Pedido.js';
import { Producto } from '../models/Producto.js';

// @desc    Crear un pedido nuevo
// @route   POST /api/pedidos/
const createPedido = asyncHandler(async (req, res) => {
  const usuarioId = req.user.id;
  const { items } = req.body;

  // 1. Validaciones iniciales básicas
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('El pedido debe tener al menos un ítem.');
  }

  // 2. Extraer todos los IDs de los productos para hacer UNA sola consulta
  const productoIds = [...new Set(items.map(item => item.productoId))];

  // 3. Consultamos TODOS los productos en un solo viaje a la BD
  const productosEncontrados = await Producto.find({ _id: { $in: productoIds } });

  // 4. Creamos un "Mapa" para acceso rápido (O(1))
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
      res.status(400);
      throw new Error('Cada ítem debe tener productoId y cantidad mayor a 0.');
    }

    // Buscamos en nuestro mapa (memoria)
    const productoDB = mapaProductos.get(productoId);

    if (!productoDB) {
      res.status(404);
      throw new Error(`Producto no encontrado con ID: ${productoId}`);
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
});

// @desc    Traer todos los pedidos
// @route   GET /api/pedidos
const getPedidos = asyncHandler(async (req, res) => {
  const pedidos = await Pedido.find({}).populate('usuario', 'id username email');
  res.status(200).json(pedidos);
});

// @desc    Traer pedidos propios
// @route   GET /api/pedidos/mios
const getPedidosPropios = asyncHandler(async (req, res) => {
  const usuarioId = req.user.id;
  const pedidos = await Pedido.find({ usuario: usuarioId }).sort({ createdAt: -1 });
  res.status(200).json(pedidos);
});

// @desc    Actualizar el estado de un pedido
// @route   PUT /api/pedidos/:id
const updateEstadoPedido = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Leemos los valores permitidos directamente del Modelo
  const estadosValidos = Pedido.schema.path('estado').enumValues;

  // Validamos que el estado enviado esté en esa lista
  if (!estado || !estadosValidos.includes(estado)) {
    res.status(400);
    throw new Error(
      `Estado inválido. Los estados permitidos son: ${estadosValidos.join(', ')}`
    );
  }

  const pedidoActualizado = await Pedido.findByIdAndUpdate(
    id,
    { estado },
    { new: true, runValidators: true }
  );

  if (!pedidoActualizado) {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }

  res.status(200).json({
    message: `El pedido ha pasado a estado: ${estado}`,
    pedido: pedidoActualizado
  });
});

export { createPedido, getPedidos, getPedidosPropios, updateEstadoPedido };