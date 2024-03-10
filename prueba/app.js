import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import usuario from './routers/routers.js';
import { pool } from "./database/conexion.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
    try {
        await pool.query("SELECT 1");
        console.log("Conexión establecida");
    } catch (error) {
        console.error("Error de conexión:", error);
    }
})();

app.use('/', usuario);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
