import { Router } from 'express';
import viewsRoutes from './views/view.routes.js';
import apiRoutes from './api/api.routes.js'; // Este ya se encarga de la API

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send("Hola mundo");
});

router.use('/api', apiRoutes);
router.use('/', viewsRoutes);

export default router;