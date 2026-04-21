import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router.js'
import { checkDB, syncDB } from './config/db.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.use(express.static("public"))
app.use(express.urlencoded()) // ← imprescindible para leer req.body de formularios
app.use(express.json()) // ← imprescindible para leer req.body en formato json

//app.engine("pug", require("pug").__express);
app.set('view engine', 'pug')
app.set('views', './src/views')

app.get("/",(req,res)=>{
    res.render("auth")
}) 

app.use("/", router)

// Rutas
app.use("/", router)

// Base de datos
checkDB();
syncDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`)
})