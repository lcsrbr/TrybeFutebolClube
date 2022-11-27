import IMatchesWithName from '../interfaces/IMatchesWithName';
import IOverAll from '../interfaces/IOverAll';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LbService {
  private _teams: Teams[] = [];
  private _matches: IMatchesWithName[] = [];
  private _overAll: IOverAll[] = [];

  async getTeams() {
    this._teams = await Teams.findAll();
    return this._teams;
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

  getTotalHomeGoals() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamHome?.teamName) {
          const t = team;
          if (match.homeTeamGoals > match.awayTeamGoals) {
            t.totalVictories += 1;
            t.totalPoints += 3;
          }
          if (match.homeTeamGoals === match.awayTeamGoals) {
            t.totalDraws += 1;
            t.totalPoints += 1;
          }
          if (match.homeTeamGoals < match.awayTeamGoals) t.totalLosses += 1;
          return t;
        }
      });
    });
    this.getOverAllHomePoints();
  }

  getTotalAwayGoals() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamAway?.teamName) {
          const t = team;
          if (match.homeTeamGoals < match.awayTeamGoals) {
            t.totalVictories += 1;
            t.totalPoints += 3;
          }
          if (match.homeTeamGoals === match.awayTeamGoals) {
            t.totalDraws += 1;
            t.totalPoints += 1;
          }
          if (match.homeTeamGoals > match.awayTeamGoals) t.totalLosses += 1;
          return t;
        }
      });
    });
    this.getOverAllAwayPoints();
  }

  getOverAllHomePoints() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamHome?.teamName) {
          const t = team;
          t.totalGames += 1;
          t.goalsFavor += match.homeTeamGoals;
          t.goalsOwn += match.awayTeamGoals;
          t.goalsBalance = team.goalsFavor - team.goalsOwn;
          t.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
          return t;
        }
      });
    });
  }

  getOverAllAwayPoints() {
    this._overAll.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamAway?.teamName) {
          const t = team;
          t.totalGames += 1;
          t.goalsFavor += match.awayTeamGoals;
          t.goalsOwn += match.homeTeamGoals;
          t.goalsBalance = team.goalsFavor - team.goalsOwn;
          t.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
          return t;
        }
      });
    });
  }

  getClassificationOrder(param: string) {
    this.getTeams();
    this.getMatches();
    this.getOverAll();
    if (param === 'home') {
      this.getTotalHomeGoals();
    }
    if (param === 'away') {
      this.getTotalAwayGoals();
    }
    if (param === 'all') {
      this.getTotalHomeGoals();
      this.getTotalAwayGoals();
    }
    // this.getTotalWhateverPoints();
    const sort = [...this._overAll].sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
      || b.goalsOwn + a.goalsOwn);
    return sort;
  }
}
