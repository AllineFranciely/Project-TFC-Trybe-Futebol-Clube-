import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const matchesController = new MatchesController();

router.get('/matches', matchesController.getAll);
router.post('/matches', matchesController.createMatch);
router.patch('/matches/:id', tokenValidation, matchesController.editMatch);
router.patch('/matches/:id/finish', tokenValidation, matchesController.finishMatch);

export default router;
