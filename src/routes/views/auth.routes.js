import userController from '../../controller/views/user.controller.js';
import { Router } from "express";
import authController from "../../controller/views/auth.controller.js";
import { checkCredentials } from "../../middleware/auth.middleware.js";

const router = Router();


router.get("/login", authController.viewLogin);
router.post("/login", authController.login);
router.get("/register", (req, res) => res.render('auth/register'));
router.post("/register", userController.createUser); 
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
});

export default router;