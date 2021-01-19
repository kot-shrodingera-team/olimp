import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import { log } from '@kot-shrodingera-team/germes-utils';
import getBet from '../getBet';
// import isClone from '../isClone';
import isCupis from '../isCupis';

const getCoefficient = (() => {
  if (isCupis()) {
    return getCoefficientGenerator({
      coefficientSelector: '.cur-val',
    });
  }
  // if (isClone()) {
  //   return getCoefficientGenerator({
  //     coefficientSelector: '',
  //   });
  // }
  return () => {
    const bet = getBet();
    if (!bet) {
      log('Не найден коэффициент (ставка не найдена)', 'crimson');
      return 0;
    }
    const coefficient = bet.value;
    if (!coefficient) {
      log('Не найден коэффициент', 'crimson');
      return 0;
    }
    if (Number.isNaN(coefficient)) {
      log(`Непонятный формат коэффициента: "${coefficient}"`, 'crimson');
      return 0;
    }
    return coefficient;
  };
})();

export default getCoefficient;
