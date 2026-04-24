import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import router from './routes/router.js'
import { checkDB, syncDB } from './config/db.js'
import { injectUserToViews } from './middlewares/auth.middleware.js';

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.use(express.urlencoded()) 
app.use(express.json()) 
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

app.use(injectUserToViews)
app.use(express.static("public"))
app.set('view engine', 'pug')
app.set('views', './src/views')
/* 
app.get("/",(req,res)=>{
    res.render("index")
})  */
app.use("/", router)

checkDB();
syncDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`)
})