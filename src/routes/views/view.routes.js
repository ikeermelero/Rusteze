import { Router } from 'express';
//import authRoutes from './auth.routes.js';
import carsRoutes from './cars.routes.js';
import clientRoutes from './client.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import repairRoutes from './repair.routes.js';
import reservationRoutes from './reservation.routes.js';

const router = Router();

// Vinculamos las rutas de vistas
router.use('/auth', authRoutes);
router.use('/cars', carsRoutes);
router.use('/clients', clientRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/repairs', repairRoutes);
router.use('/reservations', reservationRoutes);

export default router;