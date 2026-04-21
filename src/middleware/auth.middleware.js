import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";

async function isRegisterDataCorrect(req, res, next) {
    const { name, email, phone, password, passwordRepeat, dateOfBirth } = req.body;

    if (password !== passwordRepeat) {
        return res.redirect("/register?message=las contraseñas no coinciden")
    }
    const oldUser = await authService.getUserByEmail(email);
    if (oldUser) {
        return res.redirect("/register?message=ya existe un usuario con este email")
    }
    const finalPhone = phone || null;
    const finalDateOfBirth = dateOfBirth || null;
    // demás comprobaciones
    const hash = await bcrypt.hash(password, 10);
    req.registerData = {
        name, email, phone: finalPhone, password: hash, dateOfBirth: finalDateOfBirth
    }
    next();
}

async function checkCredentials(req, res, next) {
    const user = await authService.getUserByEmail(req.body.email);
    if (!user) {
        return res.redirect("/login?message=Credenciales incorrectas");
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
        return res.redirect("/login?message=Credenciales incorrectas");
    }
    req.session.user = {
        email: user.email,
        role: user.role
    }
    next();
}

async function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        return res.redirect("/login?message=Inicia sesión");
    }
}
async function requireRole(...roles) {
    return (req, res, next) => {
        if (roles.includes(req.session.user.role)) {
            next();
        }
        else {
            res.status(403).redirect("/login?message=Inicia sesión")
        }
    }
}
async function requireAdmin(req, res, next) {
    if (req.session.user.role === "admin") {
        next();
    }
    else {
        res.status(403).redirect("/errors/404")
    }
}

const injectUserToViews = (req, res, next) => {
  // Verificamos si existe la sesión y el usuario dentro de ella
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null; // Opcional: asegura que 'user' esté definido como null si no hay sesión
  }
  
  // Es vital llamar a next() para que la petición continúe su flujo
  next();
};


export {
    isRegisterDataCorrect,
    checkCredentials,
    isLoggedIn,
    requireRole,
    requireAdmin,
    injectUserToViews
}