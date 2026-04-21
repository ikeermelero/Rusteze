import authService from "../services/auth.service.js";
import bcrypt from "bcryptjs";


async function isRegisterDataCorrect(req, res, next) {
    const { name, surname, email, password_hash, passwordRepeat, phone } = req.body;

   
    if (password_hash !== passwordRepeat) {
        return res.render("auth", { error: "Las contraseñas no coinciden" });
    }

    
    const oldUser = await authService.getUserByEmail(email);
    if (oldUser) {
        return res.render("auth", { error: "Ya existe un usuario con este email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_hash, salt);

    
    req.registerData = {
        name,
        surname,
        email,
        password_hash: hash,
        phone: phone || null,
        id_role: 2, 
        id_taller: 1
    };

    next();
}


async function checkCredentials(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await authService.getUserByEmail(email);
        
        if (!user) {
            return res.render("auth", { error: "Credenciales incorrectas" });
        }

      
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordCorrect) {
            return res.render("auth", { error: "Credenciales incorrectas" });
        }

       
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


async function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        return res.redirect("/auth/login");
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
        res.status(403).redirect("/auth/login");
    }
}

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