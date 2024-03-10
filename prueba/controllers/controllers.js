import { pool } from "../database/conexion.js";

export const selectUser = async (req, res)=> {
    let query = 'SELECT * FROM users';

    try {
        const [rows] = await pool.query(query);

        if (rows.length > 0) {
            res.status(200).json({rows});
        } else {
            res.status(404).json({ message: "No se encontraron usuarios." });
        }
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
}
