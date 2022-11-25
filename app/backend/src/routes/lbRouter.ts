import { Router } from 'express';
import LbController from '../controllers/lbController';

const router = Router();

const lbController = new LbController();

router.get('/teste', (req, res) => lbController.getHomeLbTeste(req, res));
router.get('/', (req, res) => lbController.getLb(req, res));
router.get('/home', (req, res) => lbController.getHomeLb(req, res));
router.get('/away', (req, res) => lbController.getAwayLb(req, res));

export default router;
