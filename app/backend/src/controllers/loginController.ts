import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import Jwt from '../jwt';

export default class LoginController {
  loginService = new LoginService();
  jwt = new Jwt();

  async getUserRoleWithToken(req: Request, response: Response) {
    const { authorization } = req.headers;
    const result = await this.loginService.getUserRoleWithToken(authorization || '');
    return response.status(200).json({ role: result && result.role });
  }

  async validateLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const validate = await this.loginService.validateLogin(email, password);
    if (typeof validate !== 'number') {
      const token = await this.jwt.createToken(req.body);
      return res.status(200).json({ token });
    }
    const message = validate === 400 ? 'All fields must be filled' : 'Incorrect email or password';
    return res.status(validate).json({ message });
  }
}
