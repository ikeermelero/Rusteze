import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import authService from "../../services/auth.service.js";

async function viewLogin(req, res) {
    
    res.render('auth', { error: null }); 
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await authService.login(email, password);
        res.redirect("/views/dashboard"); 
    } catch (e) {
       
        res.render("auth", { error: e.message });
    }
}

async function register(req, res) {
    try {
        await authService.register(req.body);
        res.redirect('/auth/login?registered=true');
    } catch (e) {
        res.render("auth", { error: e.message });
    }
}


export default {
    viewLogin,
    login,
    register
};