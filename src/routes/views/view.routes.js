import { Router } from 'express'
// import carRoutes from './cars.routes.js'; 
import authRoutes from './auth.routes.js'; 
import dashboardRoutes from './dashboard.routes.js';
import clientRoutes from './client.routes.js';
//import repairRoutes from './repair.routes.js';
//import { isLoggedIn,requireAdmin,requireRole } from "../../middlewares/authiddleware.js";


const router = Router();


router.use('/', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/repairs', repairRoutes)
//router.use('/task', taskRoutes)
//router.use('/clients', )
//router.use('/cars', carRoutes)

router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/servicios', (req, res) => {
    res.render('service'); 
});

export default router;