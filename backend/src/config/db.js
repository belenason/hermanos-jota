import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectionString = process.env.DB_URI;

export const conectarDB = async () => {
  try {
    if (!connectionString) {
        throw new Error("DB_URI no está definida en las variables de entorno.");
    }
    await mongoose.connect(connectionString);
    console.log('¡Conexión exitosa a MongoDB! ✅');
  } catch (error) {

    console.error('Error al conectar a MongoDB: ❌', error);
    // Si la conexión falla, es un error fatal, salimos del proceso
    process.exit(1);
  }
};