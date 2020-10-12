import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import isClone from '../isClone';
import isCupis from '../isCupis';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

const openEvent = async (): Promise<void> => {
  // ЦУПИС
  if (isCupis()) {
    log('Ищем событие', 'steelblue');
    const event = (await getElement(
      `.default__Link-sc-14zuwl2-0[href*="${worker.EventId}"]`
    )) as HTMLElement;
    if (!event) {
      throw new JsFailError('Событие не найдено');
    }
    log('Нашли событие', 'steelblue');
    event.click();
    return;
  }
  // Клон
  if (isClone()) {
    // eslint-disable-next-line no-useless-return
    return;
  }
  // Офшор
  // eslint-disable-next-line no-useless-return
  return;
  // if (window.location.href.includes(worker.EventId)) {
  //   log('Открыта страница нужного события', 'steelblue');
  //   return;
  // }
  // const event = (await getElement(`a[id$="${worker.EventId}"]`)) as HTMLElement;
  // if (!event) {
  //   throw new JsFailError('Событие не найдено');
  // }
  // log('Событие найдено', 'steelblue');
  // event.click();
  // throw new NewUrlError('Переходим на страницу события');
};

export default openEvent;
