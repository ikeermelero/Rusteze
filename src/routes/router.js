import { Router } from 'express';
import { injectUserToViews } from '../middleware/auth.middleware.js'; 
import viewsRoutes from './views/view.routes.js';
import apiRoutes from './api/api.routes.js';

const router = Router();

// 1. Middlewares de nivel de router
router.use(injectUserToViews); 

// 2. Definición de rutas
router.use('/api', apiRoutes);
router.use('/', viewsRoutes);

// 3. Ruta de test
router.get('/test-status', (req, res) => {
    res.status(200).send("El servidor está vivito y coleando");
});

export default router;