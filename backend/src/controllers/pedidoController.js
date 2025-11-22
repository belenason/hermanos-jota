import { Pedido } from '../models/Pedido.js';
import { Producto } from '../models/Producto.js';


// @desc    Crear un pedido nuevo
// @route   POST /api/pedidos/
const createPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'El pedido debe tener al menos un ítem.' });
    }

    let total = 0;
    const itemsNormalizados = [];

    for (const item of items) {
      const { productoId, cantidad } = item;

      if (!productoId || !cantidad || cantidad <= 0) {
        return res.status(400).json({ message: 'Cada ítem debe tener productoId y cantidad mayor a 0.' });
      }

      const producto = await Producto.findById(productoId);
      if (!producto) {
        return res.status(404).json({ message: `Producto no encontrado: ${productoId}` });
      }

      const precioUnitario = producto.precio;
      total += precioUnitario * cantidad;

      itemsNormalizados.push({
        producto: producto._id,
        nombre: producto.nombre,
        precioUnitario,
        cantidad,
      });
    }

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
    res.status(500).json({ message: 'Error interno al crear el pedido.' });
  }
}

// @desc    Traer pedidos propios
// @route   GET /api/pedidos/mios
const getPedidosPropios = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const pedidos = await Pedido.find({ usuario: usuarioId })
      .sort({ createdAt: -1 });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error interno al obtener los pedidos.' });
  }
}

export {createPedido, getPedidosPropios};