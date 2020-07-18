import { awaiter } from '@kot-shrodingera-team/config/util';
import isCupis from '../isCupis';
import getStakeCount from '../stakeInfo/getStakeCount';
import { clearAllBetsButtonSelector } from '../selectors';

const clearCoupon = async (): Promise<boolean> => {
  if (isCupis()) {
    if (getStakeCount() !== 0) {
      worker.Helper.WriteLine('Купон не пуст. Очищаем');
      const clearAllBetsButton = document.querySelector(
        clearAllBetsButtonSelector
      ) as HTMLElement;
      if (!clearAllBetsButton) {
        worker.Helper.WriteLine('Ошибка: Не найдена кнопка очистки купона');
        return false;
      }
      clearAllBetsButton.click();
      const couponCleared = await awaiter(
        () => getStakeCount() === 0,
        5000,
        100
      );
      if (!couponCleared) {
        worker.Helper.WriteLine('Ошибка: Не удалось очистить купон');
        return false;
      }
      worker.Helper.WriteLine('Успешно очистили купон');
      return true;
    }
    worker.Helper.WriteLine('Купон пуст');
    return true;
  }
  if (getStakeCount() !== 0) {
    worker.Helper.WriteLine('Купон не пуст. Очищаем');
    const clearBasketButton = document.querySelector(
      '.clearAllbasket'
    ) as HTMLElement;
    if (!clearBasketButton) {
      worker.Helper.WriteLine('Ошибка: Не найдена кнопка очистки купона');
      return false;
    }
    clearBasketButton.click();
    const couponCleared = await awaiter(() => getStakeCount() === 0, 5000, 100);
    if (!couponCleared) {
      worker.Helper.WriteLine('Ошибка: Не удалось очистить купон');
      return false;
    }
    worker.Helper.WriteLine('Успешно очистили купон');
    return true;
  }
  worker.Helper.WriteLine('Купон пуст');
  return true;
};

export default clearCoupon;
