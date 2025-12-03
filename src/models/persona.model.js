import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cursos',
        required:true
    }
})

export const personas = mongoose.model("personas", personaSchema)