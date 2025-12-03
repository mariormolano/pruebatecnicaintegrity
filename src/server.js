import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

const serverPort = process.env.SERVER_PORT || 3000

app.get("/", (_, res) => {
    res.send("hola mundo")
})

app.listen(serverPort, () =>{
    console.log("Servidor iniciado en http://localhost:"+serverPort)
})