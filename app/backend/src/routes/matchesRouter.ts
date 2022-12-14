import { Router } from 'express';
import midMatches from '../middlewares/matchesMiddleware';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getMatches(req, res));
router.get('/:id', (req, res) => matchesController.getMatchesById(req, res));
router.post(
  '/',
  midMatches,
  (req, res) => matchesController.createMatches(req, res),
);
router.patch('/:id', (req, res) => matchesController.updateGoalsMatches(req, res));
router.patch('/:id/finish', (req, res) => matchesController.updateProgressMatches(req, res));

export default router;
