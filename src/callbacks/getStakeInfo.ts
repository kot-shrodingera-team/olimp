import checkLogin from '../stakeInfo/checkLogin';
import getStakeCount from '../stakeInfo/getStakeCount';
import checkStakeEnabled from '../stakeInfo/checkStakeEnabled';
import getCoefficientFromCoupon from '../stakeInfo/getCoefficientFromCoupon';
import getBalance from '../stakeInfo/getBalance';
import getMinimumStake from '../stakeInfo/getMinimumStake';
import getMaximumStake from '../stakeInfo/getMaximumStake';
import getSumFromCoupon from '../stakeInfo/getSumFromCoupon';
import getParameterFromCoupon from '../stakeInfo/getParameterFromCoupon';
import showStake from '../showStake';

const getStakeInfo = (): string => {
  worker.StakeInfo.Auth = checkLogin();
  worker.StakeInfo.StakeCount = getStakeCount();
  worker.StakeInfo.IsEnebled = checkStakeEnabled();
  worker.StakeInfo.Coef = getCoefficientFromCoupon();
  worker.StakeInfo.Balance = getBalance();
  worker.StakeInfo.MinSumm = getMinimumStake();
  worker.StakeInfo.MaxSumm = getMaximumStake();
  worker.StakeInfo.Summ = getSumFromCoupon();
  worker.StakeInfo.Parametr = getParameterFromCoupon();
  if (getStakeCount() !== 1) {
    showStake();
  }
  return JSON.stringify(worker.StakeInfo);
};

export default getStakeInfo;
