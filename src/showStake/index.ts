import { getElement, sleep, awaiter } from '@kot-shrodingera-team/config/util';
import { getReactInstance } from '@kot-shrodingera-team/config/reactUtils';
import openEvent from './openEvent';
import {
  groupOutcomesSelector,
  clearAllBetsButtonSelector,
  outcomeGroupListSelector,
} from '../selectors';
import checkLogin from '../getInfo/checkLogin';
import getStakeCount from '../getInfo/getStakeCount';
import getMaximumStake from '../getInfo/getMaximumStake';

interface OutcomeGroupList {
  memoizedProps: {
    children: {
      props: {
        children: {
          props: {
            id: number;
            name: string;
            onClick: () => void;
          };
        };
      };
    }[];
  };
}

const showStake = async (): Promise<void> => {
  if (!(await openEvent())) {
    worker.JSFail();
    return;
  }
  await getElement(groupOutcomesSelector);
  await sleep(1500);

  if (getStakeCount() !== 0) {
    worker.Helper.WriteLine('Купон не пуст. Очищаем');
    const clearAllBetsButton = document.querySelector(
      clearAllBetsButtonSelector
    ) as HTMLElement;
    if (!clearAllBetsButton) {
      worker.Helper.WriteLine('Ошибка: Не найдена кнопка очистки купона');
      worker.JSFail();
      return;
    }
    clearAllBetsButton.click();
    const couponCleared = await awaiter(() => getStakeCount() === 0, 5000, 100);
    if (!couponCleared) {
      worker.Helper.WriteLine('Ошибка: Не удалось очистить купон');
      worker.JSFail();
      return;
    }
  }

  worker.Islogin = checkLogin();
  worker.JSLogined();
  if (!worker.Islogin) {
    worker.Helper.WriteLine('Ошибка: Нет авторизации');
    worker.JSFail();
    return;
  }

  const outcomeGroups = [...document.querySelectorAll(groupOutcomesSelector)];
  outcomeGroups.forEach((group) => {
    if (!group.querySelector('ul')) {
      group.querySelector('div').click();
    }
  });
  const outcomeGroupLists = [
    ...document.querySelectorAll(outcomeGroupListSelector),
  ];
  let outcome = null;
  const reactKey = Number(worker.BetId.substring(0, worker.BetId.indexOf('_')));
  // const outcomeType = Number(
  //   worker.BetId.substring(worker.BetId.indexOf('_') + 1).split(':')[1]
  // );
  // reactKey += outcomeType;
  worker.Helper.WriteLine(`reactKey = ${reactKey}`);
  // eslint-disable-next-line no-restricted-syntax
  for (const outcomeGroupList of outcomeGroupLists) {
    console.log(outcomeGroupList.previousElementSibling.textContent);
    outcome = (getReactInstance(
      outcomeGroupList
    ) as OutcomeGroupList).memoizedProps.children.find((currentOutcome) => {
      console.log(
        `${currentOutcome.props.children.props.name} - ${currentOutcome.props.children.props.id}`
      );
      return currentOutcome.props.children.props.id === reactKey;
    });
    if (outcome) {
      break;
    }
  }
  if (!outcome) {
    worker.Helper.WriteLine('Ошибка: Ставка не найдена');
    worker.JSFail();
    return;
  }
  outcome.props.children.props.onClick();
  worker.Helper.WriteLine('Ставка найдена');
  if (!(await awaiter(() => getMaximumStake() !== 9007199254740991, 2000))) {
    worker.Helper.WriteLine('Ошибка: Максимальная ставка не появилась');
  }
  worker.JSStop();
};

export default showStake;
