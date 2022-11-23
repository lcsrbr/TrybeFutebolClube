import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import Jwt from '../jwt';

export default class TeamsController {
  teamsService = new TeamsService();
  jwt = new Jwt();

  async getTeams(_req: Request, res: Response) {
    const result = await this.teamsService.getTeams();
    return res.status(200).json(result);
  }

  async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.teamsService.getTeamsById(id);
    return res.status(200).json(result);
  }
}
