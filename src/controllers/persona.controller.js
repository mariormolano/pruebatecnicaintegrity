import {personas} from '../models/persona.model.js'
import { cursos } from '../models/curso.model.js'

export const getPersons = async (req, res) =>{
    try {
        const {id} = req.params
        console.log("getPersons:" + id)
        if (id && id.length != 24) {
            res.status(400).json({
                status: "failure",
                error: "ID invalido"
            })
            return
        }
        const listaPersonas = await personas.find(id ? {_id:id} : {})
    
        const datosListaPersonas = listaPersonas ? listaPersonas.map((persona) => {
            const resPersona = {
                id: persona._id.toString(),
                nombre: persona.nombre,
                cedula: persona.cedula,
                email: persona.email
            }
            return resPersona
        }) : {}
    
        res.json({
            status: "success",
            data: datosListaPersonas
        })
    } catch (error) {
        res.json({
            status: "failure",
            error: "Error al buscar personas"
        })
    }
}

export const createPerson = async (req, res) =>{
    try {
        const {nombre, cedula, email, curso} = req.body
        if (!nombre || !curso || !cedula) {
            console.log("Faltan datos")
            res.status(400).json({
                status: "failure",
                error:"Faltan datos"
            })
            return
        }
        const getCurso = await cursos.findOne({codigo: curso})
        const cursoId = getCurso._id
        console.log(nombre, cedula, email, curso, cursoId.toString())
        if (!cursoId.toString()){
            res.status(400).json({
                status: "failure",
                error:"No se encuetra el curso"
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
            status: "success",
            data: {nombre, cedula, email, curso}
        })
    } catch (error) {
        res.status(409).json({
            status: "failure",
            error: error?.errmsg?.includes("E11000") ? "Ya existe la persona" : error.errmsg
        })
        console.log(error.errmsg)
    }
}

export const getPersonByDNI = async (req, res) => {
    try {
        const {cedula} = req.params
        console.log(cedula)
        const responseQuery = await personas.findOne({cedula}).populate('curso')
        console.log(responseQuery)
        if (responseQuery){
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
        } else {
            res.status(400).json({
                status: "failure",
                error: "No se encuentra la cedula"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            error:"No se pudo contultar la cedula"
        })
    }
}

export const updatePersonById = async (req, res) =>{
    try {
        const {nombre, cedula, email, curso} = req.body
        const {id} = req.params
        if (!id ){
            res.status(400).json({
                status: "failure",
                error: "Se requiere de un ID"
            })
            return
        }
        if (id.length != 24) {
            res.status(400).json({
                status: "failure",
                error: "ID invalido"
            })
            return
        }
        const getPersona = await personas.findOne({_id : id})
        if (!getPersona){
            res.status(400).json({
                status: "failure",
                error: "No existen los datos la persona a actualizar"
            })
            return
        }
        
        const getCurso = await cursos.findOne({codigo: curso ? curso : getPersona.codigo})
        const cursoId = getCurso?._id || ""
        if (!cursoId.toString()){
            res.status(400).json({
                status: "failure",
                error:"No se encuetra el curso a actualizar"
            })
            return
        }

        const resNombre = nombre ? nombre : getPersona.nombre
        const resCedula = cedula ? cedula : getPersona.cedula
        const resEmail = email ? email : getPersona.email
        const resCurso = curso ? curso : getCurso.codigo

        const persona = await personas.updateOne({_id:id}, {$set: {
            nombre: resNombre, 
            cedula: resCedula, 
            email: resEmail,
            curso: cursoId
        }})
        res.json({
            status: "success",
            data: {
                nombre: resNombre,
                cedula: resCedula,
                email: resEmail,
                curso: resCurso
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failure",
            error: "No se pudo actualizar la persona"
        })
        console.log(error)
    }
}

export const deletePersonById = async (req, res) =>{
    try {
        const {id} = req.params
        if (!id ){
            res.status(400).json({
                status: "failure",
                error: "Se requiere de un ID"
            })
            return
        }
        if (id.length != 24) {
            res.status(400).json({
                status: "failure",
                error: "ID invalido"
            })
            return
        }
        const personaDelete = await personas.deleteOne({_id:id})
        if (personaDelete.deletedCount > 0){
            res.json({
                status: "success",
                data: "Persona ID: "+ id + " borrada"
            })
        } else {
            res.status(400).json({
                status: "failure",
                error: "No se encontro el id de la persona a borrar"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            error: "No se pudo borrar la persona"
        })
        console.log(error)
    }
}