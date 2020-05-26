import { setReactInputValue } from '@kot-shrodingera-team/config/reactUtils';
import { betCardInputSelector } from '../selectors';

const setStakeSumm = (sum: number): boolean => {
  worker.Helper.WriteLine(`Вводим сумму ставки: ${sum}`);
  const betCardInput = document.querySelector(betCardInputSelector);
  if (!betCardInput) {
    worker.Helper.WriteLine('Ошибка: Не найдено поле ввода суммы ставки');
    return false;
  }
  setReactInputValue(betCardInput, sum);
  return true;
};

export default setStakeSumm;
