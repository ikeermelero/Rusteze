import userService from "../../services/user.service.js";

async function login(req, res) {
    try {
        const { email, password } = req.body;
        // Llamamos al servicio que creamos antes
        const user = await userService.login(email, password);

        // Aquí podrías guardar al usuario en la sesión más adelante
        // Por ahora, si los datos son correctos, redirigimos
        res.redirect("/views/dashboard"); // O la ruta de tu dashboard
    } catch (e) {
        // Si hay error (usuario no existe o pass mal), volvemos al login con el mensaje
        res.render("auth", { error: e.message });
    }
}

async function register(req, res) {
    try {
        // Pasamos todo el req.body (name, email, password, etc.) al servicio
        await userService.register(req.body);
        
        // Si el registro va bien, lo mandamos al login para que entre
        res.redirect("/auth/login?success=true");
    } catch (e) {
        res.render("auth", { error: e.message });
    }
}

// Mantenemos las funciones que pudieras tener y añadimos las nuevas
export default {
    login,
    register
};