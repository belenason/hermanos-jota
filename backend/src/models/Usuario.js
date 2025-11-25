// models/Usuario.js
import mongoose from 'mongoose';
 
const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
		select: false
  },
  roles: {
    type: [String],
    enum: ['cliente', 'admin'],
    default: ['cliente']
  },
}, {
	timestamps: true 
});
 
export const Usuario = mongoose.model('Usuario', usuarioSchema);

