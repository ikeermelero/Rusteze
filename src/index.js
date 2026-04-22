import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router.js'
import {checkDB,syncDB} from './config/db.js'

dotenv.config() //cargar variables de entorno desde el archivo .env
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
//const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.static("public"))
app.use(express.urlencoded()) 
app.use(express.json())

//app.engine("pug", require("pug").__express);
app.set('view engine', 'pug')
app.set('views', './src/views')

app.get("/",(req,res)=>{
    res.render("auth")
}) 

app.use("/", router)

checkDB();
syncDB();

app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto http://${HOST}:${PORT}`)
})

