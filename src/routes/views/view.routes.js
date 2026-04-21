import { Router } from 'express'
//import carRoute from './cars.routes.js';
import authRoute from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
//import repairRoutes from './repair.routes.js';
import { isLoggedIn,requireAdmin,requireRole } from "../../middlewares/authMiddleware.js";


const router = Router()

router.use('/', authRoute)
router.use('/dashboard',isLoggedIn, requireAdmin, dashboardRoutes)
//router.use('/repairs', repairRoutes)
//router.use('/clients', )
//router.use('/cars', carRoutes)



export default router