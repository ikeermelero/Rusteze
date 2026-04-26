import { Router } from 'express'
import authRoutes from './auth.routes.js'; 
import dashboardRoutes from './dashboard.routes.js';
import clientRoutes from './client.routes.js';
import { isLoggedIn } from "../../middlewares/auth.middleware.js";
import repairRoutes from './repair.routes.js';

const router = Router();

router.use('/', authRoutes)
router.use('/dashboard',isLoggedIn , dashboardRoutes)
router.use('/client',isLoggedIn , clientRoutes )
router.use('/repairs', repairRoutes)

export default router;