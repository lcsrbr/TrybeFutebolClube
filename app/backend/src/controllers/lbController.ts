import { Request, Response } from 'express';
import LbService from '../services/lbService';
import Jwt from '../jwt';

export default class lbController {
  lbService = new LbService();
  jwt = new Jwt();

  async getHomeLb(_req: Request, response: Response) {
    const result = await this.lbService.getHomeLb();
    return response.status(200).json(result);
  }

  async getHomeLbTeste(_req: Request, response: Response) {
    const result = await this.lbService.getHomeLbTeste();
    return response.status(200).json(result);
  }
}
