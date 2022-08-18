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
}

export default MatchesController;
