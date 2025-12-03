import app from './src/app.js'
import dotenv from 'dotenv'

dotenv.config()

const serverPort = process.env.SERVER_PORT || 3000

app.listen(serverPort, () =>{
    console.log("Servidor iniciado en http://localhost:"+serverPort)
})

export default app