import express from 'express';
const connectDB = './src/database/conexion.js';

// Importar modelos
const Alquiler = './src/models/alquiler.model.js';
const Articulo = './src/models/articulo.model.js';
const Cliente = './src/models/cliente.model.js';
const Interes = './src/models/interes.model.js';

const app = express();

// Conectar a la base de datos
connectDB();

// Ejemplo de uso de los modelos
app.get('/', async (req, res) => {
  try {
    const alquileres = await Alquiler.find().populate('cliente articulo');
    const articulos = await Articulo.find(); // Aquí se agrega la consulta a Articulo
    const clientes = await Cliente.find(); // Aquí se agrega la consulta a Cliente
    const intereses = await Interes.find().populate('alquiler'); // Aquí se agrega la consulta a Interes

    res.json({
      alquileres,
      articulos,
      clientes,
      intereses,
    });

    res.send("toma Perro")
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
