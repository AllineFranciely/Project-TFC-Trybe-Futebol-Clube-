import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import userValidation from '../middlewares/userValidation';

const router = Router();
const loginController = new LoginController();

router.post('/login', userValidation, loginController.login);

export default router;
