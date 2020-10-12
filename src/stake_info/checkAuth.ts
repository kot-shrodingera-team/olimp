import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';
import isCupis from '../isCupis';
import isClone from '../isClone';

export const authStateReady = (() => {
  if (isCupis()) {
    return authStateReadyGenerator({
      noAuthElementSelector: 'button.not-autorized-bar__ButtonAsLink-u8i7bt-0',
      authElementSelector: 'span[title="Личный кабинет"]',
      maxDelayAfterNoAuthElementAppeared: 2000,
      // logging: false,
    });
  }
  if (isClone()) {
    return authStateReadyGenerator({
      noAuthElementSelector: 'input#login-username',
      authElementSelector: '.js-showusername',
      // maxDelayAfterNoAuthElementAppeared: 0,
      logging: false,
    });
  }
  return authStateReadyGenerator({
    noAuthElementSelector: '.enter-block input[name="login"]',
    authElementSelector: '.balance-link',
    // maxDelayAfterNoAuthElementAppeared: 0,
    // logging: false,
  });
})();

const checkAuth = (() => {
  if (isCupis()) {
    return checkAuthGenerator({
      authElementSelector: 'span[title="Личный кабинет"]',
    });
  }
  if (isClone()) {
    return checkAuthGenerator({
      authElementSelector: '.js-showusername',
    });
  }
  return checkAuthGenerator({
    authElementSelector: '.balance-link',
  });
})();

export default checkAuth;
