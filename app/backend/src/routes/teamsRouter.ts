import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (req, res) => teamsController.getTeams(req, res));
router.get('/:id', (req, res) => teamsController.getTeamsById(req, res));

export default router;
