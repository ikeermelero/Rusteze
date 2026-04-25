import { Router } from 'express'
import authRoutes from './auth.routes.js'; 
import dashboardRoutes from './dashboard.routes.js';
import repairRoutes from './repair.routes.js';
import taskRoutes from './task.routes.js';
import clientRoutes from './client.routes.js';
import reservationRoutes from './reservation.routes.js';
import { isLoggedIn } from "../../middlewares/auth.middleware.js";


const router = Router()

router.use('/', authRoutes)
router.use('/dashboard',isLoggedIn, dashboardRoutes)
router.use('/repairs',isLoggedIn, repairRoutes)
router.use('/task',isLoggedIn, taskRoutes)
router.use('/client',isLoggedIn, clientRoutes )
router.use('/reservations',isLoggedIn, reservationRoutes);

export default router;