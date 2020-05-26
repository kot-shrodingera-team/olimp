import { betCardSelector } from '../selectors';

const getStakeCount = (): number => {
  return document.querySelectorAll(betCardSelector).length;
};

export default getStakeCount;
