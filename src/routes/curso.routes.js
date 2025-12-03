import { Router } from "express";
import {getAllCursos, createCurso} from '../controllers/curso.controller.js'

const router = Router()

router.get("/", getAllCursos)
router.post("/", createCurso)


export default router