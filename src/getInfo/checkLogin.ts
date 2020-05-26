import { accountButtonSelector } from '../selectors';

const checkLogin = (): boolean => {
  return Boolean(document.querySelector(accountButtonSelector));
};

export default checkLogin;
