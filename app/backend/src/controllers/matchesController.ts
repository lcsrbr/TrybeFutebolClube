import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import Jwt from '../jwt';

export default class MatchesController {
  matchesService = new MatchesService();
  jwt = new Jwt();

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const result = await this.matchesService.getMatchesByProgress(inProgress as string);
      return res.status(200).json(result);
    }

    const result = await this.matchesService.getMatches();
    return res.status(200).json(result);
  }
  async getMatchesById(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.matchesService.getMatchesById(id);
    return res.status(200).json(result);
  }
}
