/*import userService from "../../services/user.service.js";

//Sacar todos los usuarios (cliente) por id de taller
async function getAllUsersByGarageId(req, res) {
    try {
        console.log("User Controller:", req.params.id);
        const users = await userService.getAllUsersByGarageId(req.params.id);
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

export default{
  getAllUsersByGarageId,
};
*/ 

import userService from "../../services/user.service.js";


async function getAllUsersByGarageId(req, res) {
    try {
        console.log("User Controller:", req.params.id);
        const users = await userService.getAllUsersByGarageId(req.params.id);
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: e.message });
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
    showLogin,
    showRegister,
    showForgot
};