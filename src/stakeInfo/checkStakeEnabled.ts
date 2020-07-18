import { betCardLockedSelector } from '../selectors';
import isCupis from '../isCupis';
import getBet from '../getBet';

const checkStakeEnabled = (): boolean => {
  if (isCupis()) {
    // let submitButton = document.querySelector(betslipBodySubmitButtonSelector);
    const locked = document.querySelector(betCardLockedSelector);
    return Boolean(!locked);
  }
  const bet = getBet();
  return bet && !bet.deleted;
};

export default checkStakeEnabled;
