import { Router } from "express";
import userController from "../../controller/api/user.controller.js";

const router = Router();

// Rutas para procesar los datos
router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;