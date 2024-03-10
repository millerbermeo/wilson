import { Router } from "express";
import {ValidarUsuario } from '../controllers/me.validator.controller.js'; 

const route = Router();

route.post('/validar',ValidarUsuario);

export default route;




