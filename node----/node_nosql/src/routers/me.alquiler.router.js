import {Router} from "express"
import { registrarAlquiler, actualizarAlquiler } from "../controllers/me.alquiler.controller.js"
import { validarToken } from "../controllers/me.validator.controller.js"

const route = Router()


route.post('/registrar', validarToken, registrarAlquiler)
route.put('/actualizar/:id', validarToken, actualizarAlquiler)




export default route;