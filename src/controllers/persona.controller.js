import mongoose from 'mongoose'
import {personas} from '../models/persona.model.js'
import { cursos } from '../models/curso.model.js'

export const getPersons = async (req, res) =>{
    const {id} = req.params
    console.log("getPersons:" + id)
    if (id && id.length != 24) {
        res.status(400).json({
            error: "ID invalido"
        })
        return
    }
    const personById = await personas.find(id ? {_id:id} : {})
    res.json({
        data: personById
    })

}

export const createPerson = async (req, res) =>{

    try {
        const {nombre, cedula, email, curso} = req.body
        console.log(nombre, cedula, email, curso)
        const getCurso = await cursos.findOne({codigo: curso})
        const cursoId = getCurso._id

        const persona = new personas({
            _id: new mongoose.Types.ObjectId(),
            nombre, 
            cedula, 
            email, 
            cursoId
        })
        await persona.save()
        res.json({
            data: {nombre, cedula, email, curso}
        })
    } catch (error) {
        res.json({
            error: "no se pudo crear la persona"
        })
        console.log(error)
    }
}

export const getPersonById = async (req, res) =>{
    const {id} = req.params
    res.send(id)
    console.log("getPersonById")
}

export const getPersonByDNI = async (req, res) => {
    const {cedula} = req.params
    console.log(cedula)
    const responseQuery = await personas.find({cedula}).populate('curso').exec()
    console.log(responseQuery.curso)
}

export const updatePersonById = async (req, res) =>{

}

export const deletePersonById = async (req, res) =>{
    
}