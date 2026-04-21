import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export async function viewLogin(req, res) {
    // Importante pasar error: null para que Pug no falle al buscar la variable
    res.render('auth', { error: null }); 
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('auth', { error: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.render('auth', { error: "Contraseña incorrecta" });
        }

        req.session.user = {
            id: user.id_user,
            name: user.name,
            role: user.id_role
        };

        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export default { viewLogin, login };