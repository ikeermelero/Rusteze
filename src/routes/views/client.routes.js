import { Router } from "express";
import clientController from "../../controller/views/client.controller.js";
//import { checkCredentials } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", clientController.getClientDashboard);

export default router;