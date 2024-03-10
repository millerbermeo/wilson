// En tu archivo conexion.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './src/env/.env' });
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message);
  }
};
export default connectDB;






