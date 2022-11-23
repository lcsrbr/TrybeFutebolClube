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
    const inProgress = JSON.parse(param)   
    const matches = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

}

// 

// export default class UserService {
//   userModel = new UserModel();

//   async insertUser(user: IUser): Promise<string> {
//     await this.userModel.insertUser(user);
//     const result = await this.createToken(user);
//     return result;
//   }
// }
