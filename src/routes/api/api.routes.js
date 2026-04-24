import { Router } from 'express';
import userRoutes from './user.routes.js'; 
import carRoutes from './car.routes.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send("Hola api");
});



router.use('/users', userRoutes);
router.use('/cars', carRoutes);

export default router;