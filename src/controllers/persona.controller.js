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
        if (!nombre || !curso || !cedula) {
            console.log("Faltan datos")
            res.status(400).json({
                error:"faltan datos"
            })
            return
        }
        const getCurso = await cursos.findOne({codigo: curso})
        const cursoId = getCurso._id
        console.log(nombre, cedula, email, curso, cursoId.toString())
        if (!cursoId.toString()){
            res.status(400).json({
                error:"no se encuetra el curso"
            })
        }

        const persona = new personas({
            nombre, 
            cedula, 
            email, 
            curso:cursoId
        })
        await persona.save()
        res.json({
            data: {nombre, cedula, email, curso}
        })
    } catch (error) {
        res.status(409).json({
            error: error?.errmsg?.includes("E11000") ? "Ya existe la persona" : error.errmsg
        })
        console.log(error.errmsg)
    }
}

export const getPersonByDNI = async (req, res) => {
    const {cedula} = req.params
    console.log(cedula)
    const responseQuery = await personas.findOne({cedula}).populate('curso')
    console.log(responseQuery)
    res.json({
        persona:{
            nombre: responseQuery.nombre,
            cedula: responseQuery.cedula,
            email: responseQuery.email
        },
        curso:{
            nombre: responseQuery.curso.nombre,
            codigo: responseQuery.curso.codigo,
            descripcion: responseQuery.curso.descripcion
        }
    })
}

export const updatePersonById = async (req, res) =>{
    try {
        const {nombre, cedula, email, curso} = req.body
        if (!nombre || !curso || !cedula) {
            console.log("Faltan datos")
            res.status(400).json({
                error:"faltan datos"
            })
            return
        }
        const {id} = req.params
        console.log("getPersons:" + id)
        if (!id || id.length != 24) {
            res.status(400).json({
                error: "ID invalido"
            })
            return
        }
        const getCurso = await cursos.findOne({codigo: curso})
        console.log(getCurso)
        const cursoId = getCurso._id
        console.log(nombre, cedula, email, curso, cursoId.toString())
        if (!cursoId.toString()){
            res.status(400).json({
                error:"no se encuetra el curso"
            })
        }

        const persona = await personas.updateOne({_id:id}, {$set: {
            nombre, 
            cedula, 
            email, 
            curso:cursoId
        }})
        res.json({
            data: {nombre, cedula, email, curso}
        })
        console.log(persona)
    } catch (error) {
        res.status(400).json({
            error: "no se pudo actualizar la persona"
        })
        console.log(error)
    }
}

export const deletePersonById = async (req, res) =>{
    
}