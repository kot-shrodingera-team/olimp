import { betCardLockedSelector } from '../selectors';

const checkStakeEnabled = (): boolean => {
  // let submitButton = document.querySelector(betslipBodySubmitButtonSelector);
  const locked = document.querySelectorAll(betCardLockedSelector);
  return Boolean(locked);
};

export default checkStakeEnabled;
