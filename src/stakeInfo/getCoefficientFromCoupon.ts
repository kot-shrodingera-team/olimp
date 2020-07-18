import { betValueSelector } from '../selectors';
import isCupis from '../isCupis';
import getBet from '../getBet';

const getCoefficientFromCoupon = (): number => {
  if (isCupis()) {
    const betValueElement = document.querySelector(betValueSelector);
    if (!betValueElement) {
      worker.Helper.WriteLine('Ошибка: Не найден коэффициент ставки в купоне');
      return 0;
    }
    const coefficientText = betValueElement.textContent.trim();
    const coefficient = Number(coefficientText);
    if (Number.isNaN(coefficient)) {
      worker.Helper.WriteLine(
        `Непонятный формат коэффициента в купоне: "${coefficientText}"`
      );
      return 0;
    }
    return coefficient;
    // const selectedBet = document.querySelector('.outcome-item button.ikJTUT');
    // if (!selectedBet) {
    //   worker.Helper.WriteLine(
    //     'Не найдена кнопка выбранной ставки. Определяем кэф из купона'
    //   );
    //   const betValueElement = document.querySelector(betValueSelector);
    //   if (!betValueElement) {
    //     worker.Helper.WriteLine(
    //       'Ошибка: Не найден коэффициент ставки в купоне'
    //     );
    //     return 0;
    //   }
    //   const coefficientText = betValueElement.textContent.trim();
    //   const coefficient = Number(coefficientText);
    //   if (Number.isNaN(coefficient)) {
    //     worker.Helper.WriteLine(
    //       `Непонятный формат коэффициента в купоне: "${coefficientText}"`
    //     );
    //     return 0;
    //   }
    //   return coefficient;
    // }
    // const coefficientElement = selectedBet.querySelector('.cwvoEP');
    // if (!coefficientElement) {
    //   worker.Helper.WriteLine(
    //     'Не найден коэффициент в кнопке выбранной ставки'
    //   );
    //   return 0;
    // }
    // const coefficientText = coefficientElement.textContent.trim();
    // const coefficient = Number(coefficientText);
    // if (Number.isNaN(coefficient)) {
    //   worker.Helper.WriteLine(
    //     `Непонятный формат коэффициента в кнопке выбранной ставки: "${coefficientText}"`
    //   );
    //   return 0;
    // }
    // return coefficient;
  }
  const bet = getBet();
  return bet && bet.value;
};

export default getCoefficientFromCoupon;
