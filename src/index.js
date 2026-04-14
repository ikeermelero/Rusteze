import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'
import router from './routes/router.js'


dotenv.config() //cargar variables de entorno desde el archivo .env

const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const JWT_SECRET = process.env.JWT_SECRET;

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


app.use(express.json()) // ← imprescindible para leer req.body en formato json
app.use(express.urlencoded()) // ← imprescindible para leer req.body de formularios
app.use("/", router)


//perro sanche
app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto http://${HOST}:${PORT}`)
})

