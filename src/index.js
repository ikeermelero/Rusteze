import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router.js'
import { checkDB, syncDB } from './config/db.js'
import session from 'express-session';

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.use(express.static("public"))
app.use(express.urlencoded()) 
app.use(express.json()) 

app.use(session({
    secret: 'rusteze-secret-key', // Cambia esto por algo seguro
    resave: false,
    saveUninitialized: false,
    
}));
app.set('view engine', 'pug')
app.set('views', './src/views')

app.get("/",(req,res)=>{
    res.render("auth")
}) 

//app.use("/", router)


app.use("/", router)


checkDB();
syncDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`)
})