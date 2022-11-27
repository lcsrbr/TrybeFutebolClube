import Matches from '../database/models/Matches';

interface teamName {
  teamName: string
}

export default interface IMatchesWithName extends Matches {
  teamHome?: teamName;
  teamAway?: teamName;
}
