import { toasterMessageSelector } from '../selectors';
import { updateBalance } from '../getInfo/getBalance';

const checkStakeStatus = (): boolean => {
  const toasterMessage = document.querySelector(toasterMessageSelector);
  if (!toasterMessage) {
    worker.Helper.WriteLine('Ошибка: Не найдено сообщение о результате ставки');
    return false;
  }
  if (toasterMessage.textContent === 'Ваша ставка успешно принята!') {
    worker.Helper.WriteLine('Ставка принята');
    updateBalance();
    return true;
  }
  worker.Helper.WriteLine('Ставка не принята');
  worker.Helper.WriteLine(toasterMessage.textContent);
  return false;
};

export default checkStakeStatus;
