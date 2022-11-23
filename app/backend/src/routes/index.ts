import { Router } from 'express';
import Login from './loginRouter';
import Teams from './teamsRouter';

const router = Router();

router.use('/login', Login);
router.use('/teams', Teams);

export default router;
