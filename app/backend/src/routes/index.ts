import { Router } from 'express';
import Login from './loginRouter';
import Teams from './teamsRouter';
import Matches from './matchesRouter';
import Leaderboard from './lbRouter';

const router = Router();

router.use('/login', Login);
router.use('/teams', Teams);
router.use('/matches', Matches);
router.use('/leaderboard', Leaderboard);

export default router;
