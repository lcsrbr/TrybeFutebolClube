import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
// const bcrypt = require('bcryptjs');

export default class MatchesService {
  constructor(private matches = Matches) { }

  public async getMatches(): Promise<Matches[]> {
    const matches = await this.matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async getMatchesById(id: string): Promise<Matches | null> {
    const matches = await this.matches.findByPk(id);
    return matches;
  }

  public async getMatchesByProgress(param: string): Promise<Matches[]> {
    const inProgress = JSON.parse(param); // transformar string em boolean
    const matches = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async createMatches(
    homeTeam:string,
    awayTeam:string,
    homeTeamGoals:string,
    awayTeamGoals:string,
  ): Promise<Matches | null> {
    const matches = await this.matches
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return matches;
  }

  public async updateProgressMatches(id: string): Promise<void | null> {
    await this.matches.update({ inProgress: false }, { where: { id } });
  }

  public async updateGoalsMatches(
    id: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ): Promise<void | null> {
    await this.matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
