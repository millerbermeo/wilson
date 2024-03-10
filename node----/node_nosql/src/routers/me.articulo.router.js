import {Router} from "express"

import { registrarArticulo, actualizarArticulo } from "../controllers/me.articulo.controller.js"
import { validarToken } from "../controllers/me.validator.controller.js"

const route = Router()

route.post('/registrar', validarToken, registrarArticulo)
route.put('/actualizar/:id', validarToken, actualizarArticulo)


export default route;