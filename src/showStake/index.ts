import { getElement, sleep, awaiter } from '@kot-shrodingera-team/config/util';
import { getReactInstance } from '@kot-shrodingera-team/config/reactUtils';
import openEvent from './openEvent';
import { groupOutcomesSelector, outcomeGroupListSelector } from '../selectors';
import checkLogin from '../stakeInfo/checkLogin';
import getStakeCount from '../stakeInfo/getStakeCount';
import getMaximumStake from '../stakeInfo/getMaximumStake';
import isCupis from '../isCupis';
import { updateBalance } from '../stakeInfo/getBalance';
import setBetAcceptMode from './setBetAcceptMode';
import { loginCheckReady } from '../authorize';
import clearCoupon from './clearCoupon';

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
  if (isCupis()) {
    await loginCheckReady();
    worker.Islogin = checkLogin();
    worker.JSLogined();
    if (!worker.Islogin) {
      worker.Helper.WriteLine('JSFail: Нет авторизации');
      return;
    }

    if (!(await openEvent())) {
      worker.JSFail();
      return;
    }
    await getElement(groupOutcomesSelector);
    await sleep(1500);

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
    const reactKey = Number(
      worker.BetId.substring(0, worker.BetId.indexOf('_'))
    );
    // const outcomeType = Number(
    //   worker.BetId.substring(worker.BetId.indexOf('_') + 1).split(':')[1]
    // );
    // reactKey += outcomeType;

    // worker.Helper.WriteLine(`reactKey = ${reactKey}`);
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
    worker.Helper.WriteLine('Ставка найдена');

    // eslint-disable-next-line no-await-in-loop
    if (!(await clearCoupon())) {
      worker.JSFail();
      return;
    }

    const maxTryCount = 5;
    for (let i = 1; i <= maxTryCount; i += 1) {
      outcome.props.children.props.onClick();
      // eslint-disable-next-line no-await-in-loop
      const betAdded = await awaiter(() => getStakeCount() === 1, 200, 50);

      if (!betAdded) {
        if (i === maxTryCount) {
          worker.Helper.WriteLine(`Ставка так и не попала в купон`);
          worker.JSFail();
          return;
        }
        worker.Helper.WriteLine(`Ставка не попала в купон (попытка ${i})`);
      } else {
        worker.Helper.WriteLine('Ставка попала в купон');
        break;
      }
    }
    if (
      !(await awaiter(
        () =>
          getMaximumStake(false) !== 9007199254740991 &&
          getMaximumStake(false) !== 0,
        2000
      ))
    ) {
      worker.Helper.WriteLine('Ошибка: Максимальная ставка не появилась');
      worker.JSFail();
      return;
    }
    setBetAcceptMode();
    worker.Helper.WriteLine('Ставка успешно открыта');
    worker.JSStop();
  } else {
    // eslint-disable-next-line no-lonely-if
    if (window.location.pathname === '/betting') {
      worker.Helper.WriteLine('Ищем событие');
      if (!(await openEvent())) {
        worker.JSFail();
      }
    } else if (!window.location.href.includes(worker.EventId)) {
      worker.Helper.WriteLine('Непонятная страница');
      worker.JSFail();
    } else {
      worker.Helper.WriteLine('Открыто нужное событие');
      worker.Helper.WriteLine(`Ищем ставку "${worker.BetName}"`);

      const betId = worker.BetId.split('_')[1];

      await Promise.race([
        getElement('.basket-empty'),
        getElement('.busket-item'),
      ]);
      console.log(`stakeCount = ${getStakeCount()}`);

      const maxTryCount = 5;
      for (let i = 1; i <= maxTryCount; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const bet = (await getElement(`span[id*="${betId}"]`)) as HTMLElement;

        if (!bet) {
          worker.Helper.WriteLine('Ошибка открытия купона: Исход не найден');
          worker.JSFail();
          return;
        }

        worker.Helper.WriteLine('Исход найден');
        bet.style.border = '1px solid red';

        // eslint-disable-next-line no-await-in-loop
        if (!(await clearCoupon())) {
          worker.JSFail();
          return;
        }

        bet.click();
        // eslint-disable-next-line no-await-in-loop
        const betAdded = await awaiter(() => getStakeCount() === 1, 500, 50);

        if (!betAdded) {
          if (i === maxTryCount) {
            worker.Helper.WriteLine(`Ставка так и не попала в купон`);
            worker.JSFail();
            return;
          }
          worker.Helper.WriteLine(`Ставка не попала в купон (попытка ${i})`);
        } else {
          worker.Helper.WriteLine('Ставка успешно открыта');
          updateBalance();
          setBetAcceptMode();
          worker.JSStop();
          return;
        }
      }
    }
  }
};

export default showStake;
