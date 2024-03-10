import express from 'express';
import connectDB from './src/database/conexion.js';
import clienteRoutes from "./src/routers/me.cliente.router.js";
import articulosRoutes from "./src/routers/me.articulo.router.js"
import interesRoutes from "./src/routers/me.interes.router.js"
import alquilerRoutes from "./src/routers/me.alquiler.router.js"
import bodyParser from 'body-parser';
import validator from "./src/routers/me.validator.router.js"
import dotenv from 'dotenv';

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send("Hola mundo");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.use('/me/usuario',validator);
app.use('/me/clientes', clienteRoutes);
app.use('/me/articulos', articulosRoutes);
app.use('/me/interes', interesRoutes);
app.use('/me/alquiler', alquilerRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
