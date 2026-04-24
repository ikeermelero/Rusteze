import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuraciones de DB y Rutas
import router from './routes/router.js';
import { checkDB, syncDB } from './config/db.js';

// Inicialización
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Configuración de rutas (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARES ---

// 1. Archivos estáticos (CSS, Imágenes, JS del cliente)
app.use(express.static(path.join(__dirname, '../public')));

// 2. Procesamiento de datos de formularios y JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- MOTOR DE PLANTILLAS (PUG) ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// --- RUTAS ---

// Usamos el router principal que ya organiza /api y /views
app.use('/', router); 

// Redirección inicial (ajustada a tu nueva estructura /views/auth/login)
app.get('/', (req, res) => {
    res.redirect('/views/auth/login');
});

app.get('/test', (req, res) => {
    res.send("<h1>¡El servidor está vivo!</h1>");
});
// --- BASE DE DATOS Y SERVIDOR ---
checkDB().then(() => {
    syncDB();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor listo en: http://${HOST}:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Error al conectar la base de datos:', err);
});