import getMaximumStakeGenerator, {
  maximumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';
import { log } from '@kot-shrodingera-team/germes-utils';
import { OlimpBet, OlimpCloneBet } from '../bookmakerApi';
import getBet from '../getBet';
import isClone from '../isClone';
// import isClone from '../isClone';
import isCupis from '../isCupis';

export const maximumStakeReady = (() => {
  if (isCupis()) {
    return maximumStakeReadyGenerator({
      maximumStakeElementSelector:
        '.bet-card-wrap__BetCardWrap-muhxrm-0 .single__InfoMax-f0u43l-0:last-child',
      // maximumStakeRegex: null,
    });
  }
  // if (isClone()) {
  //   return maximumStakeReadyGenerator({
  //     maximumStakeElementSelector: '',
  //     // maximumStakeRegex: null,
  //   });
  // }
  return async (timeout = 5000, interval = 100): Promise<boolean> => true;
  // return maximumStakeReadyGenerator({
  //   maximumStakeElementSelector: '',
  //   // maximumStakeRegex: null,
  // });
})();

const getMaximumStake = (() => {
  if (isCupis()) {
    return getMaximumStakeGenerator({
      maximumStakeElementSelector:
        '.bet-card-wrap__BetCardWrap-muhxrm-0 .single__InfoMax-f0u43l-0:last-child',
      maximumStakeRegex: null,
      log: false,
    });
  }
  if (isClone()) {
    return () => {
      const bet = getBet() as OlimpCloneBet;
      if (!bet) {
        log('Не найдена максимальная ставка (ставка не найдена)', 'crimson');
        return 0;
      }
      const max = bet.vmaxbet;
      if (!max) {
        log('Не найдена максимальная ставка', 'crimson');
        return 0;
      }
      if (Number.isNaN(max)) {
        log(`Непонятный формат максимальной ставки: "${max}"`, 'crimson');
        return 0;
      }
      return Number(max);
    };
  }
  return () => {
    const bet = getBet() as OlimpBet;
    if (!bet) {
      log('Не найдена максимальная ставка (ставка не найдена)', 'crimson');
      return 0;
    }
    const max = bet.new_max_bet;
    if (!max) {
      log('Не найдена максимальная ставка', 'crimson');
      return 0;
    }
    if (Number.isNaN(max)) {
      log(`Непонятный формат максимальной ставки: "${max}"`, 'crimson');
      return 0;
    }
    return max;
  };

  // return getMaximumStakeGenerator({
  //   maximumStakeElementSelector: '',
  //   maximumStakeRegex: null,
  // });
})();

export default getMaximumStake;
