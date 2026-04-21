import userService from "../../services/user.service.js";

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await userService.login(email, password);
        res.redirect("/views/dashboard"); 
    } catch (e) {
       
        res.render("auth", { error: e.message });
    }
}

async function register(req, res) {
    try {
       
        await userService.register(req.body);
        
       
        res.redirect("/auth/login?success=true");
    } catch (e) {
        res.render("auth", { error: e.message });
    }
}

export default {
    login,
    register
};