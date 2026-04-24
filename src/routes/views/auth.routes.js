import { Router } from 'express';
import userController from '../../controller/api/user.controller.js';

const router = Router();

router.get('/login', userController.showLogin);
router.get('/registro', userController.showRegister);
router.get('/recuperar', userController.showForgot);

// Los POST para los formularios
router.post('/login', userController.loginUser);
router.post('/registro', userController.registerUser);
router.post('/forgot', userController.handleForgot);

export default router;