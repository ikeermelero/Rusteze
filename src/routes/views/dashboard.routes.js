import { Router } from "express";
import { isLoggedIn } from "../../middlewares/auth.middleware.js";
import dashboardController from "../../controller/views/dashboard.controller.js";
const router = Router();

router.get("/",dashboardController.getDashboard);

export default router;
