import { betslipBodySubmitButtonSelector } from '../selectors';
import isCupis from '../isCupis';
import getCoefficientFromCoupon from '../stakeInfo/getCoefficientFromCoupon';
import getParameterFromCoupon from '../stakeInfo/getParameterFromCoupon';
import checkStakeEnabled from '../stakeInfo/checkStakeEnabled';
import getStakeCount from '../stakeInfo/getStakeCount';
import getSumFromCoupon from '../stakeInfo/getSumFromCoupon';
import {
  clearScreenshotTaken,
  clearStakeProcessingHungMessageSend,
  clearLoadingCounter,
} from './checkCouponLoading';

const doStake = (): boolean => {
  if (isCupis()) {
    const submitButton = document.querySelector(
      betslipBodySubmitButtonSelector
    ) as HTMLElement;
    if (!submitButton) {
      worker.Helper.WriteLine('Ошибка: Не найдена кнопка принятия ставки');
      return false;
    }
    submitButton.click();
    clearLoadingCounter();
    clearStakeProcessingHungMessageSend();
    clearScreenshotTaken();
    return true;
  }
  const currentCoefficient = getCoefficientFromCoupon();
  if (currentCoefficient < worker.StakeInfo.Coef) {
    worker.Helper.WriteLine(
      `Коэффициент упал перед ставкой (${worker.StakeInfo.Coef} -> ${currentCoefficient}). Ставку не делаем`
    );
    return false;
  }
  const currentParameter = getParameterFromCoupon();
  if (currentParameter !== worker.StakeInfo.Parametr) {
    worker.Helper.WriteLine(
      `Параметр изменился перед ставкой (${worker.StakeInfo.Parametr} -> ${currentParameter}). Ставку не делаем`
    );
    return false;
  }
  if (!checkStakeEnabled()) {
    worker.Helper.WriteLine('Ставка не доступна. Ставку не делаем');
    return false;
  }
  const currentStakeCount = getStakeCount();
  if (currentStakeCount !== 1) {
    worker.Helper.WriteLine(
      `В купоне не одна ставка (${currentStakeCount}). Ставку не делаем`
    );
    return false;
  }
  const currentSum = getSumFromCoupon();
  if (currentSum !== worker.StakeInfo.Summ) {
    worker.Helper.WriteLine(
      `Указанная сумма не равна расчитанной в боте (${currentSum} -> ${worker.StakeInfo.Summ})`
    );
    return false;
  }
  const submitButton = document.querySelector(
    '[name="formsubmit"]'
  ) as HTMLElement;
  if (!submitButton) {
    worker.Helper.WriteLine('Кнопка ставки не найдена. Ставку не делаем');
    return false;
  }
  worker.Helper.WriteLine('Делаем ставку');
  submitButton.click();
  clearLoadingCounter();
  clearStakeProcessingHungMessageSend();
  clearScreenshotTaken();
  return true;
};

export default doStake;
