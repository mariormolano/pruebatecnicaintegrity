import { Router } from "express";
import {getPersons, createPerson, updatePersonById, deletePersonById, getPersonByDNI } from '../controllers/persona.controller.js'

const router = Router()

router.get("/", getPersons)
router.post("/", createPerson)
router.put("/", updatePersonById)
router.delete("/", deletePersonById)
router.get("/por-cedula/:cedula", getPersonByDNI)


export default router