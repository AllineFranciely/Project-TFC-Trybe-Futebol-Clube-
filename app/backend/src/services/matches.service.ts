import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class MatchesService {
  static verifyTeam = async (id: number) => Teams.findByPk(id);

  static getAll = async () => (Matches.findAll({
    include: [
      {
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ],
  }));

  static getByQuery = async (query: string) => {
    const inProgress = query === 'true' ? 1 : 0;
    return Matches.findAll({
      where: { inProgress },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
  };
}

export default MatchesService;
