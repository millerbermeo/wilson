import Alquiler from "../models/me.alquiler.model.js";


export const registrarAlquiler = async (req, res) => {

    try {
        const nuevoAlquiler = new Alquiler({
            idAlquiler: req.body.idAlquiler,
            valor: req.body.valor,
            fecha: req.body.fecha,
            meses: req.body.meses,
            descripcion: req.body.descripcion,
            interes: req.body.interes,
            cliente: req.body.cliente,
            articulo: req.body.articulo
        })

        const guadarAlquiler = await nuevoAlquiler.save()

        return res.status(200).json(guadarAlquiler);
    } catch (error) {
        console.error('Error al registrar alquiler:', error);
        return res.status(500).json({ error: "Error al registrar alquiler" });
    }
}

export const actualizarAlquiler = async (req, res) => {

    try {
        const id = req.params.id

        const datosActualizados = req.body

        const resultado = await Alquiler.updateOne({ idAlquiler: id }, { $set: datosActualizados })
        if (resultado.nModified > 0) {
            return res.status(200).json({ message: "actualizado" });
        } else if (resultado.n === 0) {
            return res.status(404).json({ message: "No se encontró el alquiler" });
        } else {
            return res.status(200).json({ message: "Los datos del artículo son los mismos, no se realizó ninguna actualización" });
        }
    } catch (error) {
        console.error('Error al actualizar alquiler:', error);
        return res.status(500).json({ error: "Error al actualizar alquiler" });
    }
}


