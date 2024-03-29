import { log, getElement } from '@kot-shrodingera-team/germes-utils';
import isClone from '../isClone';
import isCupis from '../isCupis';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

const preCheck = async (): Promise<void> => {
  // ЦУПИС
  if (isCupis()) {
    const couponTabInactive = document.querySelector(
      '.betslip__CouponTab-tyjzhu-2.jBiqQG'
    ) as HTMLElement;
    if (couponTabInactive) {
      log('Открыта не вкладка с купонами. Переключаем вкладку', 'orange');
      couponTabInactive.click();
      const couponTabActive = await getElement(
        '.betslip__CouponTab-tyjzhu-2.cLoJdY'
      );
      if (!couponTabActive) {
        throw new JsFailError('Вкладка так и не переключилась');
      }
    }
    if (window.location.pathname !== '/live') {
      log('Открыт не Live', 'steelblue');
      const live = document.querySelector('[href="/live"]') as HTMLElement;
      if (!live) {
        throw new JsFailError('Не найдена кнопка перехода на Live');
      }
      log('Переходим на Live', 'orange');
      live.click();
    } else {
      log('Октрыт Live', 'steelblue');
    }
    return;
  }
  // Клон
  if (isClone()) {
    return;
  }
  // Офшор
  if (window.location.href.includes(worker.EventId)) {
    log('Открыта страница нужного события', 'steelblue');
    await Promise.race([
      getElement('.basket-empty'),
      getElement('.busket-item'),
    ]);
    return;
  }
  log('Открыта не страница нужного события', 'crimson');
  // https://olimp.com/live/5/6736/61691344
  // https://olimp.com/index.php?page=line&action=2&live[]=61691344&sid[]=5
  const sidRegex = /\/live\/(\d+)\/./;
  const sidMatch = worker.EventUrl.match(sidRegex);
  if (!sidMatch) {
    throw new JsFailError('Не найден sid. Сообщите в ТП');
  }
  const sid = sidMatch[1];
  const url = new URL(
    `index.php?page=line&action=2&live[]=${worker.EventId}&sid[]=${sid}`,
    window.location.origin
  );
  window.location.href = url.href;
  throw new NewUrlError('Переходим на страницу события');
  // if (window.location.pathname !== '/betting') {
  //   log('Открыт не Live', 'steelblue');
  //   window.location.href = new URL('/betting', worker.BookmakerMainUrl).href;
  //   throw new NewUrlError('Переходим на Live');
  // }
  // log('Открыт Live', 'steelblue');
  // await Promise.race([getElement('.basket-empty'), getElement('.busket-item')]);
};

export default preCheck;
