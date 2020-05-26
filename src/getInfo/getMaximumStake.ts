import { betCardSpanSelector } from '../selectors';

const getMaximumStake = (): number => {
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
  if (!result) {
    worker.Helper.WriteLine('Ошибка: Не найдена максимальная ставка');
  }
  return result;
};

export default getMaximumStake;
