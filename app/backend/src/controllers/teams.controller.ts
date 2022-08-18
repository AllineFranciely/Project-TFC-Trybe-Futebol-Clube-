import { Request, Response, NextFunction } from 'express';
import Teams from '../services/teams.service';

class TeamsController {
  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await Teams.getAll();
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await Teams.getById(id);

      if (!response) {
        return res.status(404).json({ message: 'Team does not exist' });
      }

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;
