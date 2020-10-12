import '@kot-shrodingera-team/worker-declaration/workerCheck';
import { log } from '@kot-shrodingera-team/germes-utils';
import showStake from './show_stake';
import afterSuccesfulStake from './worker_callbacks/afterSuccesfulStake';
import checkCouponLoading from './worker_callbacks/checkCouponLoading';
import checkStakeStatus from './worker_callbacks/checkStakeStatus';
import doStake from './worker_callbacks/doStake';
import setStakeSum from './worker_callbacks/setStakeSum';
import getStakeInfo from './worker_callbacks/getStakeInfo';
import initialize from './initialization';
import fastLoad from './fastLoad';

worker.SetCallBacks(
  log,
  getStakeInfo,
  setStakeSum,
  doStake,
  checkCouponLoading,
  checkStakeStatus,
  afterSuccesfulStake
);

worker.SetFastCallback(fastLoad);

(async (): Promise<void> => {
  log('Загрузка страницы', 'steelblue');
  if (worker.IsShowStake) {
    showStake();
  } else {
    initialize();
  }
})();
