import userService from "../../services/user.service.js";
import bcrypt from 'bcrypt';


const loginUser = async (req, res) => {
    try {
        const { email, password_hash } = req.body; // 'password_hash' es el name que pusimos en el Pug
        console.log("Intento de login para:", email);
        const user = await userService.getUserByEmail(email);
        if (user) {
            
            const isMatch = await bcrypt.compare(password_hash, user.password_hash);
            if (isMatch) {
                console.log("Login exitoso para:", user.name);
                return res.redirect('/views/dashboard'); // Asegúrate de que esta ruta exista
            }
        }
        
        return res.render('auth', { 
            mode: 'login', 
            error: 'Email o contraseña incorrectos' 
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error interno en el motor");
    }
};


const registerUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        // Redirigir siempre con la ruta completa para evitar el error de "Unsafe load"
        return res.redirect('/views/login'); 
    } catch (error) {
        return res.render('auth', { 
            mode: 'register', 
            error: 'No se pudo registrar el usuario' 
        });
    }
};

const handleForgot = async (req, res) => {
    try {
        const { email, password_hash } = req.body; // Usamos password_hash para ser consistentes
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.render('auth', { mode: 'forgot', error: 'El email no existe' });
        }

        // Encriptamos la nueva contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(password_hash, salt);

        await userService.updatePassword(email, newHashedPassword);
        
        return res.render('auth', { 
            mode: 'login', 
            message: 'Contraseña actualizada. ¡Ya puedes arrancar!' 
        });
    } catch (error) {
        res.status(500).send("Error al recuperar");
    }
};


const showLogin = (req, res) => res.render('auth', { mode: 'login' });
const showRegister = (req, res) => res.render('auth', { mode: 'register' });
const showForgot = (req, res) => res.render('auth', { mode: 'forgot' });

export default {
    loginUser,
    registerUser,
    handleForgot,
    showLogin,
    showRegister,
    showForgot
};