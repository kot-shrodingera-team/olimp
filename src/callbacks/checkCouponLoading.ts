import {
  betslipBodyLoaderSelector,
  toasterMessageSelector,
} from '../selectors';
import isCupis from '../isCupis';

let loadingCounter = 0;
let stakeProcessingHungMessageSend = false;

export const clearLoadingCounter = (): void => {
  loadingCounter = 0;
};
export const clearStakeProcessingHungMessageSend = (): void => {
  stakeProcessingHungMessageSend = false;
};

let screenshotTaken = false;

export const clearScreenshotTaken = (): void => {
  screenshotTaken = false;
};

const checkCouponLoading = (): boolean => {
  loadingCounter += 1;
  if (!stakeProcessingHungMessageSend && loadingCounter > 200) {
    const message =
      `В Olimp очень долгое принятие ставки. Возможно зависание\n` +
      `Событие: ${worker.TeamOne} - ${worker.TeamTwo}\n` +
      `Ставка: ${worker.BetName}\n` +
      `Сумма: ${worker.StakeInfo.Summ}\n` +
      `Коэффициент: ${worker.StakeInfo.Coef}\n`;
    worker.Helper.SendInformedMessage(message);
    worker.Helper.WriteLine('Очень долгое принятие ставки. Возможно зависание');
    stakeProcessingHungMessageSend = true;
  }
  if (isCupis()) {
    const betslipBodyLoader = document.querySelector(betslipBodyLoaderSelector);
    if (betslipBodyLoader) {
      worker.Helper.WriteLine('Обработка ставки');
      return true;
    }
    const toasterMessage = document.querySelector(toasterMessageSelector);
    if (!toasterMessage) {
      worker.Helper.WriteLine('Обработка ставки (нет лоадера и результата)');
      return true;
    }
    worker.Helper.WriteLine('Обработка ставки завершена (есть результат)');
    return false;
  }
  const basketLoad = document.querySelector('.busket_load');
  if (basketLoad) {
    worker.Helper.WriteLine('Обработка ставки (индикатор)');
    return true;
  }
  const errorMessage = document.querySelector('#error-wraper-betslip');
  if (errorMessage) {
    const errorText = errorMessage.textContent.trim();
    worker.Helper.WriteLine(
      `Обработка ставки завершена (Текст результата: "${errorText}")`
    );
  }
  if (!screenshotTaken) {
    worker.Helper.WriteLine(
      'Индикатор загрузки пропал, но результата ставки нет'
    );
    worker.TakeScreenShot(false);
    screenshotTaken = true;
  }
  worker.Helper.WriteLine('Обработка ставки (нет результата)');
  return false;
};

export default checkCouponLoading;
