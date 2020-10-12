import { log } from '@kot-shrodingera-team/germes-utils';
import isClone from '../isClone';
import isCupis from '../isCupis';
import { updateBalance } from '../stake_info/getBalance';

const checkStakeStatus = (): boolean => {
  // ЦУПИС
  if (isCupis()) {
    const toasterMessageElements = [
      ...document.querySelectorAll('.toaster__Toast-sc-1pone7r-1 .message'),
    ];
    if (toasterMessageElements.length === 0) {
      log('Результат ставки не найден (не найдено сообщение)', 'red');
      return false;
    }
    const toasterMessageElement =
      toasterMessageElements[toasterMessageElements.length - 1];
    const toasterMessage = toasterMessageElement.textContent.trim();
    if (toasterMessage === 'Ваша ставка успешно принята!') {
      log('Ставка принята', 'green');
      updateBalance();
      return true;
    }
    log(`Ставка не принята (${toasterMessage})`, 'tomato');
    return false;
  }
  // Клон
  if (isClone()) {
    const popurError = document.querySelector('.popup-error');
    if (popurError) {
      const popupErrorTextElement = popurError.querySelector('.js-txt');
      if (!popupErrorTextElement) {
        log('Не найден текст ошибки ставки. Ставка не принята', 'red');
        return false;
      }
      const popupErrorText = popupErrorTextElement.textContent.trim();
      log(`Ошибка ставки: "${popupErrorText}"`, 'tomato');
      return false;
    }
    const doneElement = document.querySelector(
      '.done:not([style="display: none;"])'
    );
    if (doneElement) {
      log('ставка принята', 'green');
      return true;
    }
    const disabledBet = document.querySelector(
      '.singles .item.betslip-disabled'
    );
    if (disabledBet) {
      log('Ставка недоступна. Ставка не принята', 'tomato');
      return false;
    }
    const oddsChanged = document.querySelector(
      '.odds_changed:not([style="display: none;"])'
    );
    if (oddsChanged) {
      log('Изменение коэффициента или исхода. Ставка не принята', 'tomato');
      return false;
    }
    log('Непонятный результат. Ставка не принята', 'red');
    return false;
  }
  // Офшор
  const errorMessage = document.querySelector('#error-wraper-betslip');
  if (!errorMessage) {
    log('Результат ставки не найден (не найдено сообщение)', 'red');
    return false;
  }
  const errorText = errorMessage.textContent.trim();
  if (errorText === 'Ваша ставка успешно принята!') {
    log('Cтавка принята', 'green');
    updateBalance();
    return true;
  }
  log(`Ставка не принята (${errorText})`, 'tomato');
  return false;
};

export default checkStakeStatus;
