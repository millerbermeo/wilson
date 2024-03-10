// En tu archivo conexion.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message);
    process.exit(1); // Salir del proceso con un código de error
  }
};

export default connectDB;
