import {Router} from "express"
import { registrarInteres, eliminarInteres, listarInteresesCliente, listarTotalInteresesPorMesYAnio, listarInteresPendientePorAlquiler } from "../controllers/me.interes.controller.js"
import { validarToken } from "../controllers/me.validator.controller.js";
const route = Router()


route.get('/listar/:clienteId', validarToken, listarInteresesCliente);
route.get('/total-intereses',validarToken, listarTotalInteresesPorMesYAnio);
route.post('/registrar', validarToken, registrarInteres)
route.delete('/eliminar/:id',validarToken, eliminarInteres)
route.get('/interes-pendiente/:alquilerId',validarToken, listarInteresPendientePorAlquiler);


export default route;