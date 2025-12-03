import express from 'express'
import personaRoutes from './routes/persona.routes.js'
import cursosRoutes from './routes/curso.routes.js'


const app = express()

app.use(express.json())

app.get("/", (_, res) => {
    res.send("hola mundo")
})

app.use("/personas", personaRoutes)
app.use("/cursos", cursosRoutes)

export default app