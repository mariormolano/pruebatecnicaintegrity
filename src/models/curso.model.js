import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
    nombre: {
        type:String,
        unique: true
    },
    codigo: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String
    }
})

export const cursos = mongoose.model("cursos", cursoSchema)