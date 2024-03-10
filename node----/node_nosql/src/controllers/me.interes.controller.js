import Interes from "../models/me.interes.model.js";
import Alquiler from "../models/me.alquiler.model.js";
import Cliente from "../models/me.cliente.model.js";


export const registrarInteres = async (req, res) => {

    try {
        const nuevoInteres = new Interes({
            idInteres: req.body.idInteres,
            mes: req.body.mes,
            fecha: req.body.fecha,
            valor: req.body.valor,
            alquiler: req.body.alquiler
        })

        const guadarInteres = await nuevoInteres.save()

        return res.status(200).json(guadarInteres);
    } catch (error) {
        console.error('Error al registrar interes:', error);
        return res.status(500).json({ error: "Error al registrar interes" });
    }
}

export const eliminarInteres = async (req, res) => {

    try {
        const id = req.params.id
        const resultado = await Interes.deleteOne({ idInteres: id })

        if (resultado.nModified > 0) {

          return res.status(200).json({ message: "Eliminado el ineteres" });
      } else if (resultado.n === 0) {

          return res.status(404).json({ message: "No se encontró el artículo" });
      } else {
          // En otros casos, se ha encontrado el artículo, pero no se ha modificado (los datos son iguales)
          return res.status(200).json({ message: "Los datos del artículo son los mismos, no se realizó ninguna actualización" });
      }
    }  catch (error) {
        console.error('Error al eliminar interes:', error);
        return res.status(500).json({ error: "Error al eliminar interes" });
    }
}



export const listarInteresesCliente =  async (req, res) => {
  try {
    const clienteId = req.params.clienteId;

    // Buscar el cliente por ID
    const cliente = await Cliente.findById(clienteId);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Buscar los alquileres del cliente
    const alquileres = await Alquiler.find({ cliente: clienteId });

    // Inicializar un array para almacenar los resultados
    const resultados = [];

    // Iterar sobre los alquileres y buscar los intereses correspondientes
    for (const alquiler of alquileres) {
      const intereses = await Interes.find({ alquiler: alquiler._id });

      // Agregar información relevante a los resultados
      for (const interes of intereses) {
        resultados.push({
          nombreCliente: cliente.nombres,
          alquiler: alquiler.descripcion,
          articulo: alquiler.articulo,
          mes: interes.mes,
          valor: interes.valor
        });
      }
    }

    // Enviar los resultados como respuesta
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

};


  export const listarTotalInteresesPorMesYAnio = async (req, res) => {
    try {
      const mes = parseInt(req.body.mes);
      const anio = parseInt(req.body.anio);
  
      const intereses = await Interes.aggregate([
        {
          $match: {
            mes: mes,
            $expr: { $eq: [{ $year: "$fecha" }, anio] },
          },
        },
        {
          $group: {
            _id: null,
            totalIntereses: { $sum: "$valor" },
          },
        },
        {
          $project: {
            _id: 0,
            totalIntereses: 1,
          },
        },
      ]);
  
      if (intereses.length > 0) {
        return res.status(200).json(intereses[0]);
      } else {
        return res.status(404).json({ message: "No hay intereses para el mes y año especificados" });
      }
    } catch (error) {
      console.error('Error al listar total de intereses por mes y año:', error);
      return res.status(500).json({ error: "Error al listar total de intereses por mes y año" });
    }
  };


  export const listarInteresPendientePorAlquiler = async (req, res) => {
    try {
      const alquilerId = req.params.alquilerId;
  
      // información del alquiler
      const alquiler = await Alquiler.findById(alquilerId);
  
      if (!alquiler) {
        return res.status(404).json({ message: "No se encontró el alquiler" });
      }
  
      // Obtener intereses pagados
      const interesesPagados = await Interes.find({ alquiler: alquilerId });
  
      // Calcular los meses pendientes y el interés pendiente por pagar
      const mesesPagados = interesesPagados.map((interes) => interes.mes);
      const mesesPendientes = Array.from({ length: alquiler.meses }, (_, index) => index + 1).filter((mes) => !mesesPagados.includes(mes));
  
      const interesPendiente = mesesPendientes.map((mes) => {
        return {
          mes: mes,
          interés: alquiler.interes,
        };
      });
  
      return res.status(200).json(interesPendiente);
      
    } catch (error) {
      console.error('Error al listar interés pendiente por alquiler:', error);
      return res.status(500).json({ error: "Error al listar interés pendiente por alquiler" });
    }
  };