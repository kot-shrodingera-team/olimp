import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getBalance';
import isClone from '../isClone';
import isCupis from '../isCupis';

export const balanceReady = (() => {
  if (isCupis()) {
    return balanceReadyGenerator({
      balanceSelector: '.user-bars__Balance-sc-18yu4ah-5 span.text',
      // balanceRegex: null,
    });
  }
  if (isClone()) {
    return balanceReadyGenerator({
      balanceSelector: '.js-showbalance',
      balanceRegex: null,
    });
  }
  return balanceReadyGenerator({
    balanceSelector: '.currusum',
    // balanceRegex: null,
  });
})();

const getBalance = (() => {
  if (isCupis()) {
    return getBalanceGenerator({
      balanceSelector: '.user-bars__Balance-sc-18yu4ah-5 span.text',
      // balanceRegex: null,
    });
  }
  if (isClone()) {
    return getBalanceGenerator({
      balanceSelector: '.js-showbalance',
      // balanceRegex: null,
    });
  }
  return getBalanceGenerator({
    balanceSelector: '.currusum',
    // balanceRegex: null,
  });
})();

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
