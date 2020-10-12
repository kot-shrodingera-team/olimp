import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';
import isClone from '../isClone';
import isCupis from '../isCupis';

const getStakeCount = (() => {
  if (isCupis()) {
    return getStakeCountGenerator({
      stakeElementSelector: '.bet-card-wrap__BetCardWrap-muhxrm-0',
    });
  }
  if (isClone()) {
    return getStakeCountGenerator({
      stakeElementSelector: '.singles .item',
    });
  }
  return getStakeCountGenerator({
    stakeElementSelector: '.busket-item',
  });
})();

export default getStakeCount;
