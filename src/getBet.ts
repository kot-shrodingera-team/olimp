import { OlimpBet, OlimpCloneBet } from './bookmakerApi';

const getBet = (): OlimpBet | OlimpCloneBet => {
  if (!betslip) {
    return null;
  }
  const keys = Object.keys(betslip);
  if (keys.length === 0) {
    return null;
  }
  return betslip[keys[0]];
};

export default getBet;
