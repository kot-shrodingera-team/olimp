import { betValueSelector } from '../selectors';

const getCoefficientFromCoupon = (): number => {
  const betValue = document.querySelector(betValueSelector);
  if (!betValue) {
    worker.Helper.WriteLine('Ошибка: Не найден коэффициент ставки в купоне');
    return 0;
  }
  try {
    return parseFloat(betValue.textContent);
  } catch (e) {
    worker.Helper.WriteLine(`Ошибка: Не удалось спарсить коэффициент - ${e}`);
    return 0;
  }
};

export default getCoefficientFromCoupon;
