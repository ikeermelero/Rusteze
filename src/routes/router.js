import { Router } from 'express';
import { injectUserToViews } from '../middlewares/auth.middleware.js'; 
import viewsRoutes from './views/view.routes.js';

const router = Router();

router.use(injectUserToViews); 
router.use('/', viewsRoutes);


export default router;