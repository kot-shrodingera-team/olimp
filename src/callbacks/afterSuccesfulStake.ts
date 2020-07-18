import isCupis from '../isCupis';

const afterSuccesfulStake = (): void => {
  if (isCupis()) {
    // Может решит проблему с зависанием скрипта
    worker.Helper.WriteLine('Возвращаемся на главную страницу');
    window.location.href = worker.BookmakerMainUrl;
  }
};

export default afterSuccesfulStake;
