// backend/src/models/Producto.js
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  imagenUrl: {
    type: String,
  }
}, {
  timestamps: true 
});

export const Producto = mongoose.model('Producto', productoSchema);