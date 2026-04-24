import { Router } from 'express';
import { injectUserToViews } from '../middlewares/auth.middleware.js'; 
import viewsRoutes from './views/view.routes.js';
//import apiRoutes from './api/api.routes.js';

const router = Router();


router.use(injectUserToViews); 


//router.use('/api', apiRoutes);
router.use('/', viewsRoutes);


router.get('/test-status', (req, res) => {
    res.status(200).send("El servidor está vivito y coleando");
});

export default router;