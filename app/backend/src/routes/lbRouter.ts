import { Router } from 'express';
import LbController from '../controllers/lbController';

const router = Router();

const lbController = new LbController();

router.get('/teste', (req, res) => lbController.getHomeLbTeste(req, res));
router.get('/', (req, res) => lbController.getHomeLb(req, res));

export default router;
