import isCupis from '../isCupis';

const getMinimumStake = (): number => {
  if (isCupis()) {
    return 10;
  }
  return 10;
};

export default getMinimumStake;
