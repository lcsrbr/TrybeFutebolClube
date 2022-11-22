import { Router } from 'express';
import Login from './loginRouter';

const router = Router();

router.use('/login', Login);

export default router;
