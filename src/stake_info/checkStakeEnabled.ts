import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import { log } from '@kot-shrodingera-team/germes-utils';
import getBet from '../getBet';
// import isClone from '../isClone';
import isCupis from '../isCupis';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  if (isCupis()) {
    return true;
  }
  // if (isClone()) {
  //   return true;
  // }
  const bet = getBet();
  if (!bet) {
    log('Ставка недоступна (не найдена)', 'crimson');
    return false;
  }
  if (bet.deleted) {
    log('Ставка недоступна (заблокирована)', 'crimson');
    return false;
  }
  return true;
};

const checkStakeEnabled = (() => {
  if (isCupis()) {
    return checkStakeEnabledGenerator({
      // preCheck,
      getStakeCount,
      // betCheck: {
      //   selector: '',
      //   errorClasses: [
      //     {
      //       className: '',
      //       message: '',
      //     },
      //   ],
      // },
      errorsCheck: [
        {
          selector:
            '.bet-card-wrap__BetCardWrap-muhxrm-0 .bet-card__LockedMatch-mhg7ic-1',
          message: 'заблокирована',
        },
      ],
    });
  }
  if (isCupis()) {
    return checkStakeEnabledGenerator({
      // preCheck,
      getStakeCount,
      // betCheck: {
      //   selector: '',
      //   errorClasses: [
      //     {
      //       className: '',
      //       message: '',
      //     },
      //   ],
      // },
      errorsCheck: [
        {
          selector: '.singles .item.betslip-disabled',
          message: 'заблокирована',
        },
      ],
    });
  }
  return checkStakeEnabledGenerator({
    preCheck,
    getStakeCount,
    // betCheck: {
    //   selector: '',
    //   errorClasses: [
    //     {
    //       className: '',
    //       message: '',
    //     },
    //   ],
    // },
    // errorsCheck: [
    //   {
    //     selector: '',
    //     message: '',
    //   },
    // ],
  });
})();

export default checkStakeEnabled;
