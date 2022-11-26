import { Router } from 'express';
import validateLogin from '../middlewares/loginMiddleware';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.get('/validate', (req, res) => loginController.getUserRoleWithToken(req, res));
router.post(
  '/',
  validateLogin,
  (req, res) => loginController.validateLogin(req, res),
);

export default router;
