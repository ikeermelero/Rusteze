import { Router } from 'express'
// import carRoutes from './cars.routes.js'; 
import authRoutes from './auth.routes.js'; // 1. Cambiado a plural para que coincida abajo
import dashboardRoutes from './dashboard.routes.js';
// import repairRoutes from './repair.routes.js';
import { isLoggedIn, requireAdmin, requireRole } from "../../middleware/auth.middleware.js";

const router = Router();

// Vinculamos las rutas de vistas
router.use('/auth', authRoutes); // Ahora sí existe authRoutes

// 2. COMENTA estas líneas porque carsRoutes, clientRoutes, etc., no están definidas arriba
// router.use('/cars', carsRoutes);
// router.use('/clients', clientRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/repairs', repairRoutes);
// router.use('/reservations', reservationRoutes);

router.use('/', authRoutes); // Usa el nombre plural aquí también
router.use('/dashboard', isLoggedIn, requireAdmin, dashboardRoutes);

export default router;