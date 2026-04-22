import { Router } from "express";
import authController from "../../controller/views/auth.controller.js";
import { checkCredentials } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authController.viewLogin);
router.post("/login", checkCredentials, authController.login);
//router.post("/register", checkCredentials, authController.register);

export default router;