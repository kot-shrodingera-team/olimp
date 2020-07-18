import { betCardSpanSelector } from '../selectors';
import isCupis from '../isCupis';
import getBet from '../getBet';

const getMaximumStake = (log = true): number => {
  if (isCupis()) {
    const betCardSpans = [...document.querySelectorAll(betCardSpanSelector)];
    const betCardMaxSpanRegex = /^Макс. сумма ставки: (\d+)$/;
    let result = 0;
    betCardSpans.find((betCardSpan) => {
      const match = betCardSpan.textContent.match(betCardMaxSpanRegex);
      if (match) {
        result = Number(match[1]);
        return true;
      }
      return false;
    });
    if (log && !result) {
      worker.Helper.WriteLine('Ошибка: Не найдена максимальная ставка');
    }
    return result;
  }
  const bet = getBet();
  return bet && bet.new_max_bet;
};

export default getMaximumStake;
