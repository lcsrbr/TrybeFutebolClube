// import HttpException from '../shared/http.exception';
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

  public async validateLogin(email:string) :Promise<Users | null> {
    const login = await this.users.findOne({ where: { email } });
    return login;
  }
}
