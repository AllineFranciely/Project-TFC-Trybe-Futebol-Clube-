import Team from '../database/models/Teams';
import Match from '../database/models/Matches';
import CreateMatchLeaderboardInterface from '../interfaces/CreateMatchLeaderboardInterface';
import LeaderboardInterface from '../interfaces/LeaderboardInterface';

class LeaderboardService {
  static homeMatches = async (id: number) => {
    const homeTeam = await Match.findAll({
      raw: true,
      where: { homeTeam: id, inProgress: false },
    });
    return homeTeam;
  };

  static leaderboardCreate(matches: CreateMatchLeaderboardInterface[]): LeaderboardInterface {
    const totalGames = matches.length;
    const totalVictories = matches.filter((item) => item.homeTeamGoals > item.awayTeamGoals).length;
    const totalDraws = matches.filter((item) => item.homeTeamGoals === item.awayTeamGoals).length;
    const totalLosses = matches.filter((item) => item.homeTeamGoals < item.awayTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  }

  static ordenaMatches(leaderBoard: LeaderboardInterface[]) {
    const sortedMatches = leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);

    return sortedMatches;
  }

  static async getHomeMatches() {
    const teams = await Team.findAll();
    const homeLeaderboard = await Promise.all(teams.map(async ({ id, teamName }) => {
      const allMatches = await LeaderboardService.homeMatches(id);
      const leaderBoard = LeaderboardService.leaderboardCreate(allMatches);
      return {
        name: teamName,
        ...leaderBoard,
      };
    }));
    return homeLeaderboard;
  }
}

export default LeaderboardService;
