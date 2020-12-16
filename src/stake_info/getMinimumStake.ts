import isClone from '../isClone';
import isCupis from '../isCupis';

// export const minimumStakeReady = (() => {
//   if (isCupis()) {
//     return async (timeout = 5000, interval = 100): Promise<boolean> => true;
//   }
//   // if (isClone()) {
//   //   return async (timeout = 5000, interval = 100): Promise<boolean> => true;
//   // }
//   return async (timeout = 5000, interval = 100): Promise<boolean> => true;
// })();

const getMinimumStake = (() => {
  if (isCupis()) {
    return () => 10;
  }
  if (isClone()) {
    if (worker.Currency === 'EUR') {
      return () => 0.1;
    }
    return () => 10;
  }
  return () => 10;
})();

export default getMinimumStake;
