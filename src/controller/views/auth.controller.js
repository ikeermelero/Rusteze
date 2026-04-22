
export async function viewLogin(req, res) {
    return res.render('auth');
}

export async function login  (req, res){
   res.redirect("/dashboard")
};

export async function register  (req, res){
   res.redirect("/dashboard")
};

export default { viewLogin, login }
export async function viewLogin(req, res) {
    return res.render("auth", {mode: 'login'});
}
export async function viewRegister(req, res) {
    return res.render("auth", {mode: 'register'});
}
export async function viewForgot(req, res) {
    return res.render("auth", {mode: 'forgot'});
}

export async function viewService(req, res) {
    return res.render("service", {mode: 'service'});
}




export default {viewLogin, viewRegister, viewForgot, viewService}