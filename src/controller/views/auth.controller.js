
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
