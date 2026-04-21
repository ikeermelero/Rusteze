import { Router } from 'express'
import authRoute from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = Router()

router.use('/auth', authRoute)
router.use('/dashboard', dashboardRoutes)

router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/servicios', (req, res) => {
    res.render('service'); 
});

export default router