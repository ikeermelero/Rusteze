//import authService from "../../services/auth.service.js";

export async function viewLogin(req, res) {
    return res.render('auth');
}

export async function login  (req, res){
   res.redirect("/dashboard")
};

export default { viewLogin, login }
