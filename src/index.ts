import './workerCheck';
import './globalDefines/request';
import './requestSubscribes';
import {
  pipeHwlToConsole,
  checkUrl,
  getElement,
} from '@kot-shrodingera-team/config/util';
import authorize from './authorize';
import getStakeInfo from './callbacks/getStakeInfo';
import setStakeSumm from './callbacks/setStakeSum';
import doStake from './callbacks/doStake';
import checkCouponLoading from './callbacks/checkCouponLoading';
import checkStakeStatus from './callbacks/checkStakeStatus';
import showStake from './showStake';
import afterSuccesfulStake from './callbacks/afterSuccesfulStake';
import isCupis from './isCupis';
import clearCoupon from './showStake/clearCoupon';

pipeHwlToConsole();

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
  if (!checkUrl()) {
    worker.Helper.WriteLine('Открыта не страница конторы (или зеркала)');
    window.location.href = worker.BookmakerMainUrl;
    return;
  }
  if (isCupis()) {
    worker.Helper.WriteLine('Быстрая загрузка');
    const couponTabInactive = document.querySelector(
      '.betslip__CouponTab-tyjzhu-2.jBiqQG'
    ) as HTMLElement;
    if (couponTabInactive) {
      worker.Helper.WriteLine(
        'Открыта не вскалдка с купонами. Переключаем вкладку'
      );
      couponTabInactive.click();
      const couponTabActive = await getElement(
        '.betslip__CouponTab-tyjzhu-2.cLoJdY'
      );
      if (!couponTabActive) {
        worker.Helper.WriteLine('Вкладка так и не переключилась');
        worker.JSFail();
        return;
      }
    }

    if (!(await clearCoupon())) {
      worker.JSFail();
      return;
    }
    const live = document.querySelector('[href="/live"]') as HTMLElement;
    if (!live) {
      worker.Helper.WriteLine('Не найдена кнопка перехода на Лайв');
      worker.JSFail();
      return;
    }
    live.click();
    await showStake();
    return;
  }
  worker.Helper.WriteLine('Быстрая загрузка');
  if (window.location.pathname !== '/betting') {
    worker.Helper.WriteLine('Переходим на лайв');
    window.location.href = `${window.location.origin}/betting`;
    return;
  }
  worker.Helper.WriteLine('Уже на лайве');
  await showStake();
};

worker.SetFastCallback(fastLoad);

(async (): Promise<void> => {
  console.log('Begin');
  if (worker.IsShowStake) {
    showStake();
  } else {
    authorize();
  }
})();
