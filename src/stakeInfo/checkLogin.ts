import { accountButtonSelector } from '../selectors';
import isCupis from '../isCupis';

const checkLogin = (): boolean => {
  if (isCupis()) {
    return Boolean(document.querySelector(accountButtonSelector));
  }
  return Boolean(document.querySelector('.balance-link'));
};

export default checkLogin;
