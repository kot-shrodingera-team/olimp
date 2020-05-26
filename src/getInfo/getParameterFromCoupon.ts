import { betOutcomeNameSelector } from '../selectors';

const getParameterFromCoupon = (): number => {
  const betOutcomeName = document.querySelector(betOutcomeNameSelector);
  if (!betOutcomeName) {
    worker.Helper.WriteLine('Ошибка: Не найдена роспись ставки');
    return -9999;
  }
  const parameterRegex = /^.*\((\d+(?:\.\d+)?)\)(?: бол| мен)?$/;
  const match = betOutcomeName.textContent.match(parameterRegex);
  if (!match) {
    worker.Helper.WriteLine('Ставка без параметра');
    return -6666;
  }
  const parameter = parseFloat(match[1]);
  worker.Helper.WriteLine(`Параметр = ${parameter}`);
  return parameter;
};

export default getParameterFromCoupon;
