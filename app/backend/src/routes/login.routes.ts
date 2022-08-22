import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import userValidation from '../middlewares/userValidation';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const loginController = new LoginController();

router.post('/login', userValidation, loginController.login);
router.get('/validate', tokenValidation, loginController.role);

export default router;
