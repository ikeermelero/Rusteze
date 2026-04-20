import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'
import router from './routes/router.js'
import {checkDB,syncDB} from './config/db.js'

dotenv.config() //cargar variables de entorno desde el archivo .env
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
//const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json()) // ← imprescindible para leer req.body en formato json
app.use(express.urlencoded()) // ← imprescindible para leer req.body de formularios
app.use("/", router)
app.set('views', './src/views')
app.set('view engine', 'pug')
//app.set("view engine", pug );
app.get("/",(req,res)=>{
    res.send("hello world");
})

checkDB();
syncDB();

app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto http://${HOST}:${PORT}`)
})

