import Teams from '../database/models/Teams';

// const bcrypt = require('bcryptjs');

export default class TeamsService {
  constructor(private teams = Teams) {}

  public async getTeams():Promise<Teams[]> {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async getTeamsById(id: string):Promise<Teams | null> {
    const teams = await this.teams.findByPk(id);
    return teams;
  }
}

// export default class UserService {
//   userModel = new UserModel();

//   async insertUser(user: IUser): Promise<string> {
//     await this.userModel.insertUser(user);
//     const result = await this.createToken(user);
//     return result;
//   }
// }
