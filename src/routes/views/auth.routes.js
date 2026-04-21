import userController from '../../controller/views/user.controller.js';
import { Router } from "express";
import authController from "../../controller/views/auth.controller.js";
import { checkCredentials } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authController.viewLogin);


export default router;
