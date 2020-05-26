import { betCardInputSelector } from '../selectors';

const getSumFromCoupon = (): number => {
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
    worker.Helper.WriteLine(`Ошибка: Не удалось спарсить сумму ставки - ${e}`);
    return 0;
  }
};

export default getSumFromCoupon;
