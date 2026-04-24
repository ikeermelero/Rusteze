import { Router } from 'express';
import authRoutes from './auth.routes.js';

const router = Router();

// Esto crea las rutas /auth/login, /auth/registro, etc.
router.use('/auth', authRoutes);

export default router;