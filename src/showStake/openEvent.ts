import { getElement } from '@kot-shrodingera-team/config/util';

const openEvent = async (): Promise<boolean> => {
  worker.Helper.WriteLine('Ищем событие');
  const event = (await getElement(
    `[href*="${worker.EventId}"]`
  )) as HTMLElement;
  if (!event) {
    worker.Helper.WriteLine('Ошибка: Событие не найдено');
    return false;
  }
  worker.Helper.WriteLine('Нашли событие');
  event.click();
  return true;
};

export default openEvent;
