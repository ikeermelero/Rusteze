import express from 'express'
import dotenv from 'dotenv'
import path from 'path' // Añadimos esto para las rutas de carpetas
import router from './routes/router.js'
import { checkDB, syncDB } from './config/db.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

// Middlewares para leer datos
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) // Añadido { extended: true }

// Servir archivos estáticos (por si usas CSS/JS en el cliente)
app.use(express.static('public'))

// Configuración de PUG
app.set('views', './src/views') 
app.set('view engine', 'pug')

// Rutas
app.use("/", router)

// Base de datos
checkDB();
syncDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`)
})