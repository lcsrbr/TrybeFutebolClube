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
    const { authorization } = req.headers;
    const verifyUser = authorization && await this
      .loginService.getUserRoleWithToken(authorization as string);
    if (!verifyUser || !authorization) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const verifyTeams = await this.teamsService.getTeamsById(homeTeam) && await this.teamsService.getTeamsById(awayTeam);
    if (!verifyTeams) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
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
