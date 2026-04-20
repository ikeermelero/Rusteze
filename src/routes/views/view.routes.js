import { Router } from 'express'
import carRoute from './cars.routes.js';
import authRoute from './auth.routes.js';

const router = Router()

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/repairs', repairRoutes)
router.use('/clients', )
router.use('/cars', carRoutes)



export default router