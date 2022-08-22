import CreateMatch from '../interfaces/CreateMatchInterface';
import EditMatch from '../interfaces/EditMatcjInterface';
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

  static createMatch = async (requestBody: CreateMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = requestBody;
    return Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  };

  static editMatch = async ({ id, homeTeamGoals, awayTeamGoals }: EditMatch) => {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };

  static finishMatch = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };
}

export default MatchesService;
