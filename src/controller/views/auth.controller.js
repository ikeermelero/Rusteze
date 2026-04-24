import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import authService from "../../services/auth.service.js";

async function viewLogin(req, res) {
  res.render("auth", { mode: "login" });
}
async function viewRegister(req, res) {
  res.render("auth", { mode: "register" });
}
async function viewForgot(req, res) {
  res.render("auth", { mode: "forgot" });
}

async function login(req, res) {
  try {
    //const token = authService.createToken(req.user);

    req.session.user = {
                id:       req.user.id_user,
                nombre:   req.user.name,
                email:    req.user.email,
                rol:      req.user.id_role,
                id_taller: req.user.id_taller
            }
    res.redirect("/dashboard");
  } catch (e) {
    res.render("errors/500", { message: e.message });
  }
}

async function register(req, res) {
  try {
    const user = await authService.register(req.registerData);
    req.session.user = {
            id:        user.id_user,
            rol:       user.id_role,
            id_taller: user.id_taller,
            nombre:    user.name,
            email:     user.email,
        }

    res.redirect("/dashboard");
  } catch (e) {
    res.render("errors/500", { message: e.message });
  }
}

export default {
  viewLogin,
  viewRegister,
  viewForgot,
  login,
  register,
};
