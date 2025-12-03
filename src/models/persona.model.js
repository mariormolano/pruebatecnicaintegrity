import mongoose from "mongoose";
import {cursos} from './curso.model.js'

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    cedula: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cursos',
        require:true
    }
})

export const personas = mongoose.model("personas", personaSchema)