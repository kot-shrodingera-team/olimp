import {
  log,
  round,
  stakeInfoString,
} from '@kot-shrodingera-team/germes-utils';
import isClone from '../isClone';
import isCupis from '../isCupis';
import getBalance, { updateBalance } from '../stake_info/getBalance';

const checkStakeStatus = (): boolean => {
  // ЦУПИС
  if (isCupis()) {
    const resultMessageElement = document.querySelector(
      '.results__ResultsMessage-sc-7a3lgm-0'
    );
    if (resultMessageElement) {
      const resultMessage = resultMessageElement.textContent.trim();
      if (resultMessage === 'Ваша ставка успешно принята!') {
        log('Ставка принята', 'green');
        updateBalance();
        return true;
      }
      if (resultMessage === 'Соединение оборвалось. Попробуйте ещё раз') {
        const message =
          `В Olimp ошибка ставки "Соединение оборвалось. Попробуйте ещё раз"\n` +
          `${stakeInfoString()}\n` +
          `Ставка засчитана как НЕ принятая. Желательно проверить вручную\n`;
        worker.Helper.SendInformedMessage(message);
        log('Ошибка соединения. Считаем ставку не принятой', 'red');
        return false;
      }
      log(`Результат ставки: "${resultMessage}"`, 'tomato');
      log('Ставка не принята', 'red');
      return false;
    }
    const betCard = document.querySelector(
      '.bet-card-wrap__BetCardWrap-muhxrm-0'
    );
    if (betCard) {
      log('Повилась карточка ставки. Ставка не принята', 'red');
      return false;
    }
    log('Не найден результат. Ставка не принята', 'red');
    return false;
  }
  // Клон
  if (isClone()) {
    const popupError = document.querySelector(
      '.js-popup:not([style="display: none;"]) .popup-error'
    );
    if (popupError) {
      const popupErrorTextElement = popupError.querySelector('.js-txt');
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
      log('Ставка принята', 'green');
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
  if (
    /Дождитесь принятия предыдущей ставки перед приёмом новой/i.test(errorText)
  ) {
    const currentBalance = getBalance();
    log(
      `Баланс до ставки: ${worker.StakeInfo.Balance}. Текущий баланс: ${currentBalance}. Сумма ставки: ${worker.StakeInfo.Summ}`,
      'steelblue'
    );
    const balanceDrop =
      round(worker.StakeInfo.Balance - getBalance()) === worker.StakeInfo.Summ;
    if (balanceDrop) {
      const message =
        `В Olimp ошибка ставки "Дождитесь принятия предыдущей ставки перед приёмом новой"\n` +
        `${stakeInfoString()}\n` +
        `Баланс изменился на сумму ставки` +
        `Ставка засчитана как принятая. Желательно проверить вручную\n` +
        `Если ставка НЕ принята сообщить в ТП\n`;
      worker.Helper.SendInformedMessage(message);
      log('Баланс изменился на сумму ставки. Считаем ставку принятой', 'green');
      updateBalance();
      return true;
    }
    const message =
      `В Olimp ошибка ставки "Дождитесь принятия предыдущей ставки перед приёмом новой"\n` +
      `${stakeInfoString()}\n` +
      `Баланс не изменился на сумму ставки` +
      `Ставка засчитана как НЕ принятая. Желательно проверить вручную\n` +
      `Если ставка принята сообщить в ТП\n`;
    worker.Helper.SendInformedMessage(message);
    log('Cтавка не принята', 'tomato');
    return false;
  }
  log(`Ставка не принята (${errorText})`, 'tomato');
  return false;
};

export default checkStakeStatus;
