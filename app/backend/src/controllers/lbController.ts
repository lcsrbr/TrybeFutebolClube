import { Request, Response } from 'express';
import LbService from '../services/lbService';
import LbService2 from '../services/lbRefurb';
import Jwt from '../jwt';

export default class lbController {
  lbService = new LbService();
  lbService2 = new LbService2();

  jwt = new Jwt();

  async getHomeLb(_req: Request, response: Response) {
    const result = await this.lbService2.getClassificationOrder('home' as string);
    return response.status(200).json(result);
  }

  async getLb(_req: Request, response: Response) {
    const result = await this.lbService2.getClassificationOrder('all' as string);
    return response.status(200).json(result);
  }

  async getAwayLb(_req: Request, response: Response) {
    const result = await this.lbService2.getClassificationOrder('away' as string);
    return response.status(200).json(result);
  }

  async getHomeLbTeste(_req: Request, response: Response) {
    const result = await this.lbService2.getClassificationOrder('home' as string);
    return response.status(200).json(result);
  }
}
