import { betCardInputSelector } from '../selectors';
import isCupis from '../isCupis';

const getSumFromCoupon = (): number => {
  if (isCupis()) {
    const betCardInput = document.querySelector(
      betCardInputSelector
    ) as HTMLInputElement;
    if (!betCardInput) {
      worker.Helper.WriteLine('Ошибка: Не найдено поле ввода суммы ставки');
      return 0;
    }
    try {
      return parseFloat(betCardInput.value);
    } catch (e) {
      worker.Helper.WriteLine(
        `Ошибка: Не удалось спарсить сумму ставки - ${e}`
      );
      return 0;
    }
  }
  const sumInput = document.querySelector(
    'input[name="singlebet_sum0"]'
  ) as HTMLInputElement;
  if (!sumInput) {
    worker.Helper.WriteLine('Ошибка: Не найдено поле ввода суммы ставки');
    return 0;
  }
  return Number(sumInput.value.replace(/ /g, ''));
};

export default getSumFromCoupon;
