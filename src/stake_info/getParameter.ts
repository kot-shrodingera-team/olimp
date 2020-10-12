import { log } from '@kot-shrodingera-team/germes-utils';
import { OlimpBet } from '../bookmakerApi';
import getBet from '../getBet';
import isClone from '../isClone';
import isCupis from '../isCupis';

const getParameter = (): number => {
  if (isCupis()) {
    const betOutcomeName = document.querySelector(
      '.bet-card-wrap__BetCardWrap-muhxrm-0 .bet-card__OutcomeName-mhg7ic-3'
    );
    if (!betOutcomeName) {
      log('Не найден параметр (не найдена роспись ставки)');
      return -9999;
    }
    const parameterRegex = /^.*\(([+-]?\d+(?:\.\d+)?)\)(?: бол| мен)?$/;
    const match = betOutcomeName.textContent.match(parameterRegex);
    if (!match) {
      log('Ставка без параметра', 'steelblue');
      return -6666;
    }
    const parameter = Number(match[1]);
    log(`Параметр: ${parameter}`, 'steelblue');
    return parameter;
  }
  if (isClone()) {
    const betNameElement = document.querySelector('.name .fll');
    if (!betNameElement) {
      log('Не найден параметр (не найдена роспись)');
      return -9999;
    }
    const betName = betNameElement.textContent.trim();
    const parameterRegex = /\(([+-]?\d+(?:\.\d+)?)\)/;
    const parameterMatch = betName.match(parameterRegex);
    if (!parameterMatch) {
      log('Ставка без параметра', 'steelblue');
      return -6666;
    }
    const parameter = Number(parameterMatch[1]);
    log(`Параметр: ${parameter}`, 'steelblue');
    return parameter;
  }
  const bet = getBet() as OlimpBet;
  if (!bet) {
    log('Не найден параметр (не найдена ставка)');
    return -9999;
  }
  const market = bet.event_name;
  const parameterRegex = /\(([+-]?\d+(?:\.\d+)?)\)/;
  const parameterMatch = market.match(parameterRegex);
  if (!parameterMatch) {
    log('Ставка без параметра', 'steelblue');
    return -6666;
  }
  const parameter = Number(parameterMatch[1]);
  log(`Параметр: ${parameter}`, 'steelblue');
  return parameter;
};

export default getParameter;
