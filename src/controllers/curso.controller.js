import { cursos } from "../models/curso.model.js"

export const getAllCursos = async (req, res) => {
    try {
        res.json({
            data: await cursos.find()
        })
    } catch (error) {
        res.json({
            error: "error al buscar cursos"
        })
        
    }
}

export const createCurso = async (req, res) => {
    try {
        const {nombre, codigo, descripcion} = req.body
        console.log(nombre, codigo, descripcion)
        const curso = new cursos({nombre, codigo, descripcion})
        await curso.save()
        res.json({  
            data: {nombre, codigo, descripcion}
        })
    } catch (error) {
        res.json({
            error: "no se pudo crear"
        })
        console.log(error)
    }
    

}