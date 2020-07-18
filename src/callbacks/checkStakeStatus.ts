import { toasterMessageSelector } from '../selectors';
import { updateBalance } from '../stakeInfo/getBalance';
import isCupis from '../isCupis';

const checkStakeStatus = (): boolean => {
  if (isCupis()) {
    const toasterMessageElement = document.querySelector(
      toasterMessageSelector
    );
    if (!toasterMessageElement) {
      worker.Helper.WriteLine(
        'Ошибка: Не найдено сообщение о результате ставки'
      );
      return false;
    }
    const toasterMessage = toasterMessageElement.textContent.trim();
    if (toasterMessage === 'Ваша ставка успешно принята!') {
      worker.Helper.WriteLine('Ставка принята');
      updateBalance();
      return true;
    }
    worker.Helper.WriteLine(`Ставка не принята (${toasterMessage})`);
    return false;
  }
  const errorMessage = document.querySelector('#error-wraper-betslip');
  if (errorMessage) {
    const errorText = errorMessage.textContent.trim();
    worker.Helper.WriteLine(`Текст результата: "${errorText}"`);
    if (errorText === 'Ваша ставка успешно принята!') {
      worker.Helper.WriteLine('Cтавка успешно принята');
      updateBalance();
      return true;
    }
    worker.Helper.WriteLine('Ставка не принята');
    return false;
  }
  worker.Helper.WriteLine('Ставка не принята (результат ставки не найден)');
  return false;
};

export default checkStakeStatus;
