import { betslipBodySubmitButtonSelector } from '../selectors';

const doStake = (): boolean => {
  const submitButton = document.querySelector(
    betslipBodySubmitButtonSelector
  ) as HTMLElement;
  if (!submitButton) {
    worker.Helper.WriteLine('Ошибка: Не найдена кнопка принятия ставки');
    return false;
  }
  submitButton.click();
  return true;
};

export default doStake;
