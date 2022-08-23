import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = Router();

route.get('/leaderboard/home', LeaderboardController.getHomeMatches);

export default route;
