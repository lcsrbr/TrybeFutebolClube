import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import TeamsService from '../services/teamsService';
import LoginService from '../services/loginService';
import Jwt from '../jwt';

export default class MatchesController {
  matchesService = new MatchesService();
  teamsService = new TeamsService();
  loginService = new LoginService();
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
    const { id } = req.params;
    const result = await this.matchesService.getMatchesById(id);
    return res.status(200).json(result);
  }

  async createMatches(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this.matchesService
      .createMatches(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(result);
  }

  async updateProgressMatches(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.updateProgressMatches(id);
    return res.status(200).json({ message: 'Finished' });
  }

  async updateGoalsMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateGoalsMatches(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  }
}

// updateGoalsMatches
