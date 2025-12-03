import express from 'express'
const app = express()

app.get("/", (_, res) => {
    res.send("hola mundo")
})

export default app