// import HttpException from '../shared/http.exception';
import { compareSync } from 'bcryptjs';
import Users from '../database/models/Users';
import Jwt from '../jwt';

// const bcrypt = require('bcryptjs');

export default class LoginService {
  jwt = new Jwt();

  constructor(private users = Users) {}

  public async getUserRoleWithToken(authorization: string):Promise<Users | null> {
    const userToken = this.jwt.validateToken(authorization);
    const login = userToken && await this.users.findOne({ where: { email: userToken.email } });
    return login;
  }

  public async validateLogin(email:string, password:string) :Promise<Users | number> {
    if (!email || !password) {
      return 400;
    }
    const login = await this.users.findOne({ where: { email } });
    const compare = login && compareSync(password, login.password);
    if (compare) {
      return login;
    }
    return 401;
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
