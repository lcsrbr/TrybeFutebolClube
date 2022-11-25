import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
// const bcrypt = require('bcryptjs');

export default class lbService {
  public async getHomeLb(): Promise<any> {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll({
      where: { inProgress: false },
    });
    const teste = teams.map((team) => {
      const overAll = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };

      // total de pontos
      matches.forEach((match) => {
        if (team.id === match.homeTeam && match.homeTeamGoals > match.awayTeamGoals) {
          overAll.totalPoints += 3;
        }
        if (team.id === match.awayTeam && match.homeTeamGoals < match.awayTeamGoals) {
          overAll.totalPoints += 3;
        }
        if (team.id === match.homeTeam && match.homeTeamGoals === match.awayTeamGoals) {
          overAll.totalPoints += 1;
        }
        if (team.id === match.awayTeam && match.homeTeamGoals === match.awayTeamGoals) {
          overAll.totalPoints += 1;
        }
      });

      // total de jogos
      matches.forEach((match) => {
        if (team.id === match.homeTeam || team.id === match.awayTeam) {
          overAll.totalGames += 1;
        }
      });

      // total de vitórias
      matches.forEach((match) => {
        if (team.id === match.homeTeam && match.homeTeamGoals > match.awayTeamGoals) {
          overAll.totalVictories += 1;
        }
        if (team.id === match.awayTeam && match.homeTeamGoals < match.awayTeamGoals) {
          overAll.totalVictories += 1;
        }
      });

      // total de empates
      matches.forEach((match) => {
        if (team.id === match.homeTeam && match.homeTeamGoals === match.awayTeamGoals) {
          overAll.totalDraws += 1;
        }
        if (team.id === match.awayTeam && match.homeTeamGoals === match.awayTeamGoals) {
          overAll.totalDraws += 1;
        }
      });

      // total de derrotas
      matches.forEach((match) => {
        if (team.id === match.homeTeam && match.homeTeamGoals < match.awayTeamGoals) {
          overAll.totalLosses += 1;
        }
        if (team.id === match.awayTeam && match.homeTeamGoals > match.awayTeamGoals) {
          overAll.totalLosses += 1;
        }
      });

      // total de gols a favor
      matches.forEach((match) => {
        if (team.id === match.homeTeam) {
          overAll.goalsFavor += match.homeTeamGoals;
        }
        if (team.id === match.awayTeam) {
          overAll.goalsFavor += match.awayTeamGoals;
        }
      });

      // total de gols contra
      matches.forEach((match) => {
        if (team.id === match.homeTeam) {
          overAll.goalsOwn += match.awayTeamGoals;
        }
        if (team.id === match.awayTeam) {
          overAll.goalsOwn += match.homeTeamGoals;
        }
      });

      // total media de gols
      overAll.goalsBalance = overAll.goalsFavor - overAll.goalsOwn;

      // aproveitamento
      // [P / (J * 3)] * 100
      overAll.efficiency = Number(((overAll.totalPoints / (overAll.totalGames * 3)) * 100).toFixed(2));

      return overAll;
    });

    const testeSort = [...teste].sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn + a.goalsOwn);
    return Promise.all(testeSort);
  }

  public async getHomeLbTeste(): Promise<any[]> {
    const matches: any = await Matches.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const teste = await Promise.all(matches.map((match: any) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return `na partida de id ${match.id} entre os times ${match.teamHome.teamName} e ${match.teamAway.teamName}, o time ${match.teamHome.teamName} foi vitorioso com placar de ${match.homeTeamGoals} x ${match.awayTeamGoals}`;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return `na partida de id ${match.id} entre os times ${match.teamAway.teamName} e ${match.teamHome.teamName}, o time ${match.teamAway.teamName} foi vitorioso com placar de ${match.awayTeamGoals} x ${match.homeTeamGoals}`;
      }
      return `na partida de id ${match.id} os times ${match.teamHome.teamName} e ${match.teamAway.teamName} empataram em ${match.homeTeamGoals} x ${match.awayTeamGoals}`;
    }));
    return teste;
  }
}

// export default class UserService {
//   userModel = new UserModel();

//   async insertUser(user: IUser): Promise<string> {
//     await this.userModel.insertUser(user);
//     const result = await this.createToken(user);
//     return result;
//   }
// }
