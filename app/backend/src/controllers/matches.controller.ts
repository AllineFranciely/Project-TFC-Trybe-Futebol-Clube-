import { Request, Response, NextFunction } from 'express';
import Matches from '../services/matches.service';

class MatchesController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        return res.status(200).json(await Matches.getByQuery(inProgress as string));
      }
      return res.status(200).json(await Matches.getAll());
    } catch (error) {
      next(error);
    }
  };

  public createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam } = req.body;
      const verifyHomeTeam = await Matches.verifyTeam(homeTeam);
      const verifyAwayTeam = await Matches.verifyTeam(awayTeam);

      if (homeTeam === awayTeam) {
        return res.status(401).json({
          message: 'It is not possible to create a match with two equal teams',
        });
      }

      if (verifyAwayTeam === null || verifyHomeTeam === null) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      return res.status(201).json(await Matches.createMatch(req.body));
    } catch (error) {
      next(error);
    }
  };

  public editMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { id } = req.params;
      await Matches.editMatch({ id, homeTeamGoals, awayTeamGoals });
      return res.status(200).json({ message: 'Updated goals' });
    } catch (error) {
      next(error);
    }
  };

  public finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await Matches.finishMatch(id);
      return res.status(200).json({ message: 'Updated progress' });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
