import { setReactInputValue } from '@kot-shrodingera-team/config/reactUtils';
import { betCardInputSelector } from '../selectors';
import isCupis from '../isCupis';

const setStakeSumm = (sum: number): boolean => {
  worker.Helper.WriteLine(`Вводим сумму ставки: ${sum}`);
  if (isCupis()) {
    const betCardInput = document.querySelector(betCardInputSelector);
    if (!betCardInput) {
      worker.Helper.WriteLine('Ошибка: Не найдено поле ввода суммы ставки');
      return false;
    }
    setReactInputValue(betCardInput, sum);
    return true;
  }
  const sumInput = document.querySelector(
    'input[name="singlebet_sum0"]'
  ) as HTMLInputElement;
  if (!sumInput) {
    worker.Helper.WriteLine('Ошибка: Не найдено поле ввода суммы ставки');
    return false;
  }
  sumInput.value = String(sum);
  worker.StakeInfo.Summ = sum;
  return true;
};

export default setStakeSumm;
