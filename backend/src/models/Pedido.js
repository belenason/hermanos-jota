// models/Pedido.js
import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },

    items: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Producto',
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        precioUnitario: {
          type: Number,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    estado: {
      type: String,
      enum: ['pendiente', 'procesando', 'enviado', 'completado', 'cancelado'],
      default: 'pendiente',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const Pedido = mongoose.model('Pedido', pedidoSchema);
