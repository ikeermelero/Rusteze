export async function viewLogin(req, res) {
    return res.render("auth", {mode: 'login'});
}
export async function viewRegister(req, res) {
    return res.render("auth", {mode: 'register'});
}
export async function viewForgot(req, res) {
    return res.render("auth", {mode: 'forgot'});
}


export default {viewLogin, viewRegister, viewForgot}