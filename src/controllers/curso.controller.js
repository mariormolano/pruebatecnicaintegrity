import { cursos } from "../models/curso.model.js"

export const getAllCursos = async (req, res) => {
    const listaCursos = await cursos.find()
    const datosListaCursos = listaCursos ? listaCursos.map((curso) => {
        const resCurso = {
            nombre: curso.nombre,
            codigo: curso.codigo,
            descripcion: curso.descripcion
        }
        return resCurso
    }) : {}
    try {
        res.json({
            status: "success",
            data: datosListaCursos
        })
    } catch (error) {
        res.json({
            status: "failure",
            error: "error al buscar cursos"
        })
        
    }
}

export const createCurso = async (req, res) => {
    try {
        const {nombre, codigo, descripcion} = req.body
        if (!nombre || !codigo) {
            console.log("Faltan datos")
            res.status(400).json({
                status: "failure",
                error:"faltan datos"
            })
            return
        }
        console.log(nombre, codigo, descripcion)
        const curso = new cursos({nombre, codigo, descripcion})
        await curso.save()
        res.json({ 
            status: "success",
            data: "Se creo el curso exitosamente"
        })
    } catch (error) {
        res.status(409).json({
            status: "failure",
            error: error?.errmsg?.includes("E11000") ? "Ya existe este curso" : error.errmsg
        })
        console.log(error.errmsg)
    }
    

}