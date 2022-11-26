import { Request, Response } from 'express';
import LbService from '../services/lbService';
import Jwt from '../jwt';

export default class lbController {
  lbService = new LbService();

  jwt = new Jwt();

  async getHomeLb(_req: Request, response: Response) {
    const result = await this.lbService.getClassificationOrder('home' as string);
    return response.status(200).json(result);
  }

  async getLb(_req: Request, response: Response) {
    const result = await this.lbService.getClassificationOrder('all' as string);
    return response.status(200).json(result);
  }

  async getAwayLb(_req: Request, response: Response) {
    const result = await this.lbService.getClassificationOrder('away' as string);
    return response.status(200).json(result);
  }

  async getHomeLbTeste(_req: Request, response: Response) {
    const result = await this.lbService.getClassificationOrder('home' as string);
    return response.status(200).json(result);
  }
}
