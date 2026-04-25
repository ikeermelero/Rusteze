import userService from "../../services/user.service.js";
import User from "../../models/user.model.js";


export async function getAllUsersByGarageId(req, res) {
    try {
        const users = await userService.getAllUsersByGarageId(req.params.id);
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}


export async function createUser(req, res) {
    try {
       
        const { name, surname, email, password_hash, phone } = req.body;
        
        await User.create({
            name,
            surname,
            email,
            password_hash, 
            phone,
            id_role: 2,    
            id_taller: 1   
        });

        
        res.redirect('/auth/login?registered=true');
        
    } catch (error) {
        console.error("Error al crear usuario:", error);
        
        res.status(500).send("Error al registrarse. Posible email duplicado.");
    }
}

function showLogin(req, res) {
    res.render('auth', { mode: 'login' });
}

function showRegister(req, res) {
    res.render('auth', { mode: 'register' });
}

function showForgot(req, res) {
    res.render('auth', { mode: 'forgot' });
}


export default {
    getAllUsersByGarageId,
    createUser,
    showLogin,
    showRegister,
    showForgot
};