import { betCardSelector } from '../selectors';
import isCupis from '../isCupis';

const getStakeCount = (): number => {
  if (isCupis()) {
    return document.querySelectorAll(betCardSelector).length;
  }
  return document.querySelectorAll('.busket-item').length;
};

export default getStakeCount;
