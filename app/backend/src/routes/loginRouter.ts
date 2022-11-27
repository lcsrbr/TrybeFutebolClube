import { Router } from 'express';
import midLogin from '../middlewares/loginMiddleware';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.get('/validate', (req, res) => loginController.getUserRoleWithToken(req, res));
router.post(
  '/',
  midLogin,
  (req, res) => loginController.getEmail(req, res),
);

export default router;
