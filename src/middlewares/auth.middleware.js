import authService from "../services/auth.service.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


async function isRegisterDataCorrect(req, res, next) {
    try {
        const { name, surname, email, password, passwordRepeat, phone } = req.body
        console.log('registerData body:', req.body) // ← ver qué llega exactamente

        if (!password) {
            return res.render('errors/500', { message: 'La contraseña es obligatoria' })
        }

        if (password !== passwordRepeat) {
            return res.render('errors/500', { message: 'Las contraseñas no coinciden' })
        }

        const oldUser = await authService.getUserByEmail(email)
        if (oldUser) {
            return res.render('errors/500', { message: 'Ya existe un usuario con este email' })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        req.registerData = {
            name,
            surname,
            email,
            password_hash: hash,
            phone: phone || null,
            id_role: 2,
            id_taller: 1
        }

        next()

    } catch (error) {
        console.error('Error en isRegisterDataCorrect:', error.message)
        res.render('errors/500', { message: error.message })
    }
}


async function checkCredentials(req, res, next) {
    console.log('checkCredentials body:', req.body)
    const { email, password } = req.body
    try {
        const user = await authService.getUserByEmail(email)
        if (!user) {
            return res.render('auth', { error: 'Credenciales incorrectas' })
        }

        console.log('password recibido:', password)
        console.log('hash en BD:', user.password_hash)

        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash)
        console.log('¿Contraseña correcta?:', isPasswordCorrect) // ← clave

        if (!isPasswordCorrect) {
            return res.render('auth', { error: 'Credenciales incorrectas' })
        }

        req.user = user
        console.log('Pasando a next()...')
        next()

    } catch (error) {
        console.error('Error en checkCredentials:', error)
        res.render('errors/500', { message: error.message })
    }
}


async function isLoggedIn(req, res, next) {
    console.log('Verificando la sesión:', req.session, 'Usuario en sesión:', req.session?.user)
    if (req.session?.user) {
        next()
    } else {
        res.redirect('/login')
    }
}


function requireRole(...roles) {
    return (req, res, next) => {
        if (req.session.user && roles.includes(req.session.user.role)) {
            next();
        } else {
            return res.status(403).render("errors/403", { message: "No tienes permiso para acceder aquí" });
        }
    };
}


async function requireAdmin(req, res, next) {
    if (req.session?.user?.role === "admin" || req.session?.user?.role === 1) {
        next();
    } else {
        res.status(403).redirect("/login");
    }
}

const injectUserToViews = (req, res, next) => {
    // Verificamos si existe la sesión y el usuario dentro de ella
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null; // Opcional: asegura que 'user' esté definido como null si no hay sesión
    }
    next();
};


export {
    isRegisterDataCorrect,
    checkCredentials,
    isLoggedIn,
    requireRole,
    requireAdmin,
    injectUserToViews
};