import { Router } from 'express'
import authRoutes from './auth.routes.js'; 
import dashboardRoutes from './dashboard.routes.js';
// import repairRoutes from './repair.routes.js';
import { isLoggedIn, requireAdmin, requireRole } from "../../middleware/auth.middleware.js";

const router = Router();

router.use('/', authRoutes)
router.use('/dashboard', dashboardRoutes)
//router.use('/dashboard',isLoggedIn, requireAdmin, dashboardRoutes)
//router.use('/repairs', repairRoutes)
router.use('/client', clientRoutes )
//router.use('/cars', carRoutes)

router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/servicios', (req, res) => {
    res.render('service'); 
});

export default router;