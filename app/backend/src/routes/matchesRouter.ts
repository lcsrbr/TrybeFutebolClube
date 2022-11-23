import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getMatches(req, res));
router.get('/:id', (req, res) => matchesController.getMatchesById(req, res));
router.post('/', (req, res) => matchesController.createMatches(req, res));
router.patch('/:id/finish', (req, res) => matchesController.updateProgressMatches(req, res));

export default router;
