import authController from '../../controller/views/auth.controller.js';
import { Router } from "express";
import { checkCredentials } from "../../middleware/auth.middleware.js";

const router = Router();


router.get("/login", authController.viewLogin);
router.post("/login", authController.login);
router.get("/register", (req, res) => res.render('auth/register'));
router.post("/register", authController.register); 
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
});

export default router;