import isCupis from '../isCupis';

let balance: number;

const getBalance = (): number => {
  if (isCupis()) {
    return balance;
  }
  const balanceElement = document.querySelector('.currusum');
  if (!balanceElement) {
    worker.Helper.WriteLine('Не найден баланс');
    return -1;
  }
  const balanceText = balanceElement.textContent.trim().replace(/'/g, '');
  const balanceNumber = Number(balanceText);
  if (Number.isNaN(balanceNumber)) {
    worker.Helper.WriteLine(`Непонятный формат баланса: ${balanceText}`);
    return -1;
  }
  return balanceNumber;
};

export const updateBalance = (): void => {
  const currentBalance = getBalance();
  console.log(`Balance updated to ${currentBalance}`);
  worker.JSBalanceChange(currentBalance);
};

export const setBalance = (newBalance: number): void => {
  balance = newBalance;
  updateBalance();
};

export default getBalance;
