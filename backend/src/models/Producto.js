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
  imagenes: {
    type: [String],
    default: []
  },

  medidas: { type: String, trim: true },
  materiales: { type: String, trim: true },
  acabado: { type: String, trim: true },
  peso: { type: String, trim: true },
  capacidad: { type: String, trim: true },
  modulares: { type: String, trim: true },
  tapizado: { type: String, trim: true },
  confort: { type: String, trim: true },
  rotacion: { type: String, trim: true },
  garantia: { type: String, trim: true },
  cargaMaxima: { type: String, trim: true },
  almacenamiento: { type: String, trim: true },
  caracteristicas: { type: String, trim: true },
  colchon: { type: String, trim: true },
  estructura: { type: String, trim: true },
  relleno: { type: String, trim: true },
  sostenibilidad: { type: String, trim: true },
  extension: { type: String, trim: true },
  apilables: { type: String, trim: true },
  incluye: { type: String, trim: true },
  cables: { type: String, trim: true },
  regulacion: { type: String, trim: true },
  certificacion: { type: String, trim: true }

}, {
  timestamps: true 
});

export const Producto = mongoose.model('Producto', productoSchema);