import app from './src/app.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const serverPort = process.env.SERVER_PORT || 3000

app.listen(serverPort, () =>{
    console.log("Servidor iniciado en http://localhost:"+serverPort)
    mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Conectado a la base de datos"))
})

export default app