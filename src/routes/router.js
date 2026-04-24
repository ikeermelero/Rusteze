import { Router } from 'express';
import viewsRoutes from './views/view.routes.js';
import apiUserRoutes from "./api/user.routes.js";
// Quita apiRoutes y authRoutes de aquí si ya están dentro de los otros

const router = Router();

// Rutas de API
router.use("/api/users", apiUserRoutes);

// Rutas de Vistas
router.use('/', viewsRoutes); 

export default router;