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

  async getEmail(req: Request, res: Response) {
    const { email } = req.body;
    await this.loginService.getEmail(email);
    const token = await this.jwt.createToken(req.body);
    return res.status(200).json({ token });
  }
}
