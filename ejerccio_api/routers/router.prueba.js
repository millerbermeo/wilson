import { Router } from "express";
import { devolverJson } from "../controllers/controller.prueba.js";

const router = Router()

router.post('/calculadora', devolverJson)

export default router