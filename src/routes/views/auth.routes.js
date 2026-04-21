
import { Router } from 'express'
import authController from '../../controller/views/auth.controller.js'

const router = Router()

/* router.get("/login", (req, res) => {
    res.render("auth", {mode: 'login'})
})
router.get("/register", (req, res) => {
    res.render("auth", {mode: 'register'})
})
router.get("/forgot", (req, res) => {
    res.render("auth", {mode: 'forgot'})
})  */

router.get("/login",  authController.viewLogin) ;
router.get("/register",  authController.viewRegister) ;
router.get("/forgot",  authController.viewForgot) ; 
router.get("/service",  authController.viewService) ;
export default router;

/* ojo aca es */


