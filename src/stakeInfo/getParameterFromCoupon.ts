import { betOutcomeNameSelector } from '../selectors';
import isCupis from '../isCupis';
import getBet from '../getBet';

const getParameterFromCoupon = (): number => {
  if (isCupis()) {
    const betOutcomeName = document.querySelector(betOutcomeNameSelector);
    if (!betOutcomeName) {
      worker.Helper.WriteLine('Ошибка: Не найдена роспись ставки');
      return -9999;
    }
    const parameterRegex = /^.*\(([+-]?\d+(?:\.\d+)?)\)(?: бол| мен)?$/;
    const match = betOutcomeName.textContent.match(parameterRegex);
    if (!match) {
      worker.Helper.WriteLine('Ставка без параметра');
      return -6666;
    }
    const parameter = parseFloat(match[1]);
    worker.Helper.WriteLine(`Параметр = ${parameter}`);
    return parameter;
  }
  const bet = getBet();
  if (!bet) {
    return NaN;
  }
  const market = bet.event_name;
  const parameterRegex = /\(([+-]?\d+(?:\.\d+)?)\)/;
  const parameterMatch = market.match(parameterRegex);
  if (!parameterMatch) {
    worker.Helper.WriteLine('Ставка без параметра');
    return -6666;
  }
  const parameter = Number(parameterMatch[1]);
  worker.Helper.WriteLine(`Параметр: ${parameter}`);
  return parameter;
};

export default getParameterFromCoupon;
