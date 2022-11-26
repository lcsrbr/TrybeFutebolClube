import Matches from '../database/models/Matches';

interface blablabla {
  teamName: string
}

export default interface IMatchesWithName extends Matches {
  teamHome?: blablabla;
  teamAway?: blablabla;
}
