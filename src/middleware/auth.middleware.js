import authService from "../services/auth.service.js";
import bcrypt from "bcryptjs";

/**
 * Valida los datos del formulario de registro antes de crear al usuario.
 */
async function isRegisterDataCorrect(req, res, next) {
    const { name, surname, email, password_hash, passwordRepeat, phone } = req.body;

    // 1. Validar que las contraseñas coincidan
    if (password_hash !== passwordRepeat) {
        return res.render("auth", { error: "Las contraseñas no coinciden" });
    }

    // 2. Verificar si el email ya está en uso
    const oldUser = await authService.getUserByEmail(email);
    if (oldUser) {
        return res.render("auth", { error: "Ya existe un usuario con este email" });
    }

    // 3. Encriptar la contraseña antes de pasar al controlador
    // (Opcional si ya usas Hooks en el modelo, pero aquí asegura el dato)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_hash, salt);

    // Adjuntamos los datos limpios al objeto req
    req.registerData = {
        name,
        surname,
        email,
        password_hash: hash,
        phone: phone || null,
        id_role: 2, // Rol por defecto
        id_taller: 1
    };

    next();
}

/**
 * Middleware para validar las credenciales en el proceso de Login.
 */
async function checkCredentials(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await authService.getUserByEmail(email);
        
        if (!user) {
            return res.render("auth", { error: "Credenciales incorrectas" });
        }

        // Comparar contraseña ingresada con el hash de la base de datos
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordCorrect) {
            return res.render("auth", { error: "Credenciales incorrectas" });
        }

        // Si es correcto, inicializamos la sesión
        req.session.user = {
            id: user.id_user,
            email: user.email,
            role: user.id_role,
            name: user.name
        };

        next();
    } catch (error) {
        console.error("Error en checkCredentials:", error);
        res.render("auth", { error: "Error interno del servidor" });
    }
}

/**
 * Verifica si hay una sesión activa. Si no, redirige al login.
 */
async function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        return res.redirect("/auth/login");
    }
}

/**
 * Restringe el acceso por roles específicos.
 */
function requireRole(...roles) {
    return (req, res, next) => {
        if (req.session.user && roles.includes(req.session.user.role)) {
            next();
        } else {
            return res.status(403).render("errors/403", { message: "No tienes permiso para acceder aquí" });
        }
    };
}

/**
 * Middleware específico para administradores.
 */
async function requireAdmin(req, res, next) {
    if (req.session?.user?.role === "admin" || req.session?.user?.role === 1) {
        next();
    } else {
        res.status(403).redirect("/auth/login");
    }
}

/**
 * Inyecta el usuario de la sesión en las variables locales de Pug.
 * Útil para mostrar "Hola, Marcos" en el navbar.
 */
const injectUserToViews = (req, res, next) => {
    res.locals.user = req.session?.user || null;
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