import { Router } from 'express';
import Login from './loginRouter';
import Teams from './teamsRouter';
import Matches from './matchesRouter';

const router = Router();

router.use('/login', Login);
router.use('/teams', Teams);
router.use('/matches', Matches);


export default router;
