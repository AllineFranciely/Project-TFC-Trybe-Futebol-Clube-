import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getHomeMatches(_req: Request, res: Response) {
    const teamHome = await LeaderboardService.getHomeMatches();
    const sorted = LeaderboardService.ordenaMatches(teamHome);
    res.status(200).json(sorted);
  }
}
