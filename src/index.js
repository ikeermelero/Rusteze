import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import router from './routes/router.js'
import {checkDB,syncDB} from './config/db.js'
import { injectUserToViews } from './middlewares/auth.middleware.js';

dotenv.config() //cargar variables de entorno desde el archivo .env
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
//const JWT_SECRET = process.env.JWT_SECRET;

app.use(cookieParser())
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000  
    }
}));
app.use(express.json()) 
app.use(express.urlencoded()) 
app.use("/", router)
app.set('views', './src/views')
app.set('view engine', 'pug')


checkDB();
syncDB();

app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto http://${HOST}:${PORT}`)
})

