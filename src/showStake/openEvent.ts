import { getElement } from '@kot-shrodingera-team/config/util';
import isCupis from '../isCupis';

const openEvent = async (): Promise<boolean> => {
  if (isCupis()) {
    worker.Helper.WriteLine('Ищем событие');
    const event = (await getElement(
      `.default__Link-sc-14zuwl2-0[href*="${worker.EventId}"]`
    )) as HTMLElement;
    if (!event) {
      worker.Helper.WriteLine('Ошибка: Событие не найдено');
      return false;
    }
    worker.Helper.WriteLine('Нашли событие');
    event.click();
    return true;
  }
  const event = (await getElement(`a[id$="${worker.EventId}"]`)) as HTMLElement;
  if (!event) {
    worker.Helper.WriteLine('Ошибка: Событие не найдено');
    return false;
  }
  worker.Helper.WriteLine('Нашли событие');
  console.log(event);
  event.click();
  return true;
};

export default openEvent;
