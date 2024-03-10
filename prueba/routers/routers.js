import { Router } from "express";
import { selectUser } from "../controllers/controllers.js";

const router = Router()

router.get('/user', selectUser)

export default router