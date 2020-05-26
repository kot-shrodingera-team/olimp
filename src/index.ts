import './workerCheck';
import authorize from './authorize';
import getStakeInfo from './callbacks/getStakeInfo';
import setStakeSumm from './callbacks/setStakeSum';
import doStake from './callbacks/doStake';
import checkCouponLoading from './callbacks/checkCouponLoading';
import checkStakeStatus from './callbacks/checkStakeStatus';
import showStake from './showStake';
import afterSuccesfulStake from './callbacks/afterSuccesfulStake';

(async (): Promise<void> => {
  console.log('Begin');
  if (worker.IsShowStake) {
    worker.Helper.WriteLine('Загрузка страницы');
  } else {
    await authorize();
  }
})();

worker.SetCallBacks(
  console.log,
  getStakeInfo,
  setStakeSumm,
  doStake,
  checkCouponLoading,
  checkStakeStatus,
  afterSuccesfulStake
);

const fastLoad = async (): Promise<void> => {
  worker.Helper.WriteLine('Быстрая загрузка');
  const live = document.querySelector('[href="/live"]') as HTMLElement;
  if (!live) {
    worker.Helper.WriteLine('Не найдена кнопка перехода на Лайв');
    worker.JSFail();
    return;
  }
  live.click();
  await showStake();
};

worker.SetFastCallback(fastLoad);
