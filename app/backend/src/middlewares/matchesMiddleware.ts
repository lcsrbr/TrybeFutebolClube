import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import LoginService from '../services/loginService';

const teamsService = new TeamsService();
const loginService = new LoginService();

export default async function midMatches(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  const { authorization } = req.headers;
  const verifyUser = authorization && await loginService.getUserRoleWithToken(authorization);
  if (!verifyUser || !authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const verifyTeams = await teamsService.getTeamsById(homeTeam)
    && await teamsService.getTeamsById(awayTeam);
  if (!verifyTeams) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}

// updateGoalsMatches
