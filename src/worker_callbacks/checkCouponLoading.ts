import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import isClone from '../isClone';
import isCupis from '../isCupis';
import { getDoStakeTime } from '../stake_info/doStakeTime';
import getCoefficient from '../stake_info/getCoefficient';
import {
  getCurrentCoefficient,
  setCurrentCoefficient,
} from './afterSuccesfulStake';

const check = () => {
  // ЦУПИС
  if (isCupis()) {
    const betslipBodyLoader = document.querySelector(
      '.common-loader__PreloaderWrap-sc-24uv27-0'
    );
    if (betslipBodyLoader) {
      log('Обработка ставки', 'tan');
      return true;
    }
    const toasterMessage = document.querySelector(
      '.toaster__Toast-sc-1pone7r-1 .message'
    );
    if (!toasterMessage) {
      log('Обработка ставки (нет лоадера и результата)', 'tan');
      return true;
    }
    log('Обработка ставки завершена (есть результат)', 'orange');
    return false;
  }
  // Клон
  if (isClone()) {
    const betslipLoader = document.querySelector(
      '.loading-bet:not([style="display: none;"])'
    );
    if (betslipLoader) {
      log('Обработка ставки (индикатор)', 'tan');
      return true;
    }
    const popurError = document.querySelector('.popup-error');
    if (popurError) {
      const popupErrorText = popurError.querySelector('.js-txt');
      if (!popupErrorText) {
        log('Обработка ставки (всплывающее окно, но нет текста)', 'tan');
        return true;
      }
      log('Обработка ставки завершена (всплывающее окно)', 'orange');
      return false;
    }
    const doneElement = document.querySelector(
      '.done:not([style="display: none;"])'
    );
    if (doneElement) {
      log('Обработка ставки завершена (успешная ставка)', 'orange');
      return false;
    }
    const disabledBet = document.querySelector(
      '.singles .item.betslip-disabled'
    );
    if (disabledBet) {
      log('Обработка ставки завершена (ставка недоступна)', 'orange');
      return false;
    }
    const oddsChanged = document.querySelector(
      '.odds_changed:not([style="display: none;"])'
    );
    if (oddsChanged) {
      log(
        'Обработка ставки завершена (изменение коэффициента или исхода)',
        'orange'
      );
      return false;
    }
    log('Обработка ставки (нет индикатора и результата)', 'tan');
    return false;
  }
  // Офшор
  const actualCoefficient = getCoefficient();
  if (actualCoefficient) {
    const currentCoefficient = getCurrentCoefficient();
    if (actualCoefficient !== currentCoefficient) {
      if (currentCoefficient) {
        log(
          `Коэффициент изменился ${currentCoefficient} => ${actualCoefficient}`,
          'orange'
        );
      }
      setCurrentCoefficient(actualCoefficient);
    }
  }
  const basketLoad = document.querySelector('.busket_load');
  if (basketLoad) {
    log('Обработка ставки (индикатор)', 'tan');
    return true;
  }
  const errorMessage = document.querySelector('#error-wraper-betslip');
  if (errorMessage) {
    const errorText = errorMessage.textContent.trim();
    if (errorText) {
      log(
        `Обработка ставки завершена (Текст результата: "${errorText}")`,
        'orange'
      );
      return false;
    }
  }
  log('Обработка ставки (нет результата)', 'tan');
  return true;
};

const checkCouponLoading = (() => {
  if (isCupis()) {
    return checkCouponLoadingGenerator({
      getDoStakeTime,
      bookmakerName: 'Olimp',
      timeout: 50000,
      check,
    });
  }
  if (isClone()) {
    return checkCouponLoadingGenerator({
      getDoStakeTime,
      bookmakerName: 'Olimp',
      timeout: 50000,
      check,
    });
  }
  return checkCouponLoadingGenerator({
    getDoStakeTime,
    bookmakerName: 'Olimp',
    timeout: 50000,
    check,
  });
})();

export default checkCouponLoading;
