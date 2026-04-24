import authController from '../../controller/views/auth.controller.js';
import { Router } from "express";
import { isRegisterDataCorrect, checkCredentials } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/",(req,res)=>{ res.render("index") })
router.get("/login", authController.viewLogin);
router.get("/register",authController.viewRegister);
router.get("/forgot",authController.viewForgot);

router.post("/login", checkCredentials, authController.login);
router.post("/register", isRegisterDataCorrect, authController.register);

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect('/')
});

export default router;