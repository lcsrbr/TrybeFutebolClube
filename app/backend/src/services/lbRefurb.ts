import IMatchesWithName from '../interfaces/IMatchesWithName';
import IOverAll from '../interfaces/IOverAll';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LbService {
  private _teams: Teams[] = [];
  private _matches: (IMatchesWithName[]) = [];
  private _overAll: IOverAll[] = [];
  constructor() {
    this.getTeams();
    this.getMatches();
  }

  async getTeams() {
    this._teams = await Teams.findAll();
    const aa = await Teams.findAll();
    return aa;
  }

  async getMatches() {
    this._matches = await Matches.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  }

  getOverAll() {
    this._overAll = this._teams.map((team) => {
      const overAll = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
      return overAll;
    });
  }

  getTotalHomePoints() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamHome?.teamName) {
          team.totalGames += 1;
          if (match.homeTeamGoals > match.awayTeamGoals) {
            team.totalVictories += 1;
            team.totalPoints += 3;
          }
          if (match.homeTeamGoals === match.awayTeamGoals) {
            team.totalDraws += 1;
            team.totalPoints += 1;
          }
          if (match.homeTeamGoals < match.awayTeamGoals) team.totalLosses += 1;
        }
      });
    });
    this.getBalanceHomePoints();
  }

  getTotalAwayPoints() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamAway?.teamName) {
          team.totalGames += 1;
          if (match.homeTeamGoals < match.awayTeamGoals) {
            team.totalVictories += 1;
            team.totalPoints += 3;
          }
          if (match.homeTeamGoals === match.awayTeamGoals) {
            team.totalDraws += 1;
            team.totalPoints += 1;
          }
          if (match.homeTeamGoals > match.awayTeamGoals) team.totalLosses += 1;
        }
      });
    });
    this.getBalanceHomePoints();
  }

  getBalanceHomePoints() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamHome?.teamName) {
          team.goalsFavor += match.homeTeamGoals;
          team.goalsOwn += match.awayTeamGoals;
          team.goalsBalance = team.goalsFavor - team.goalsOwn;
          team.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  }

  getBalanceAwayPoints() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamAway?.teamName) {
          team.goalsFavor += match.homeTeamGoals;
          team.goalsOwn += match.awayTeamGoals;
          team.goalsBalance = team.goalsFavor - team.goalsOwn;
          team.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  }

  getClassificationOrder(param: string) {
    this.getOverAll();
    if (param === 'home') {
      this.getTotalHomePoints();
    }
    if (param === 'away') {
      this.getTotalAwayPoints();
    }
    if (param === 'all') {
      this.getTotalHomePoints();
      this.getTotalAwayPoints();
    }
    // this.getTotalWhateverPoints();
    const sort = [...this._overAll].sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
      || b.goalsOwn + a.goalsOwn);
    return sort;
  }
}
