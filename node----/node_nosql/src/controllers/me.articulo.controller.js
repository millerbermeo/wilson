import Articulo from "../models/me.articulo.model.js"


export const registrarArticulo = async (req, res) => {

    try {
        const nuevoArticulo = new Articulo({
            idArticulo: req.body.idArticulo,
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            estado: req.body.estado
        })
    
        const articuloGuardado = await nuevoArticulo.save();
    
        return res.status(200).json(articuloGuardado);
    } catch (error) {
        console.error('Error al registrar articulo:', error);
        return res.status(500).json({ error: "Error al registrar articulo" });
      }
}



// falta el de actualizar



export const actualizarArticulo = async (req, res) => {
  try {
      const id = req.params.id;
      const datosActualizados = req.body;

      const resultado = await Articulo.updateOne({ _id: id }, { $set: datosActualizados });

      if (resultado.nModified > 0) {

          return res.status(200).json({ message: "Artículo actualizado" });
      } else if (resultado.n === 0) {

          return res.status(404).json({ message: "No se encontró el artículo" });
      } else {

          return res.status(200).json({ message: "Los datos del artículo son los mismos, no se realizó ninguna actualización" });
      }
  } catch (error) {
      console.error('Error al actualizar artículo:', error);
      return res.status(500).json({ error: "Error al actualizar artículo" });
  }
};


