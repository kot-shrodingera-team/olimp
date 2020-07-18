import {
  getElement,
  sleep,
  fireEvent,
  awaiter,
} from '@kot-shrodingera-team/config/util';
import { setReactInputValue } from '@kot-shrodingera-team/config/reactUtils';
import {
  openLoginFormButtonSelector,
  accountButtonSelector,
  phoneTabSelector,
  phoneInputSelector,
  loginTabSelector,
  loginInputSelector,
  passwordInputSelector,
  loginSubmitButtonSelector,
} from './selectors';
import checkLogin from './stakeInfo/checkLogin';
import isCupis from './isCupis';
import getBalance, { updateBalance } from './stakeInfo/getBalance';

export const loginCheckReady = async (timeout = 10000): Promise<void> => {
  if (isCupis()) {
    await Promise.race([
      getElement(openLoginFormButtonSelector, timeout),
      getElement(accountButtonSelector, timeout),
    ]);
    const openLoginFormButton = document.querySelector(
      openLoginFormButtonSelector
    );
    if (openLoginFormButton) {
      worker.Helper.WriteLine('Есть кнопка входа. Ждём появления авторизации');
      await getElement(accountButtonSelector, 2000);
    }
  } else {
    await Promise.race([
      getElement('.enter-block input[name="login"]', timeout),
      getElement('.balance-link', timeout),
    ]);
  }
};

const authorize = async (): Promise<void> => {
  if (isCupis()) {
    worker.Helper.WriteLine('Проверка авторизации');
    await loginCheckReady();
    // await sleep(3000);
    worker.Islogin = checkLogin();
    worker.JSLogined();
    if (worker.Islogin) {
      worker.Helper.WriteLine('Уже авторизованы');
      return;
    }
    worker.Helper.WriteLine('Нет авторизации. Ищем поле ввода логина');
    await sleep(1000);
    const openLoginFormButton = (await getElement(
      openLoginFormButtonSelector
    )) as HTMLElement;
    if (!openLoginFormButton) {
      worker.Helper.WriteLine('Ошибка: Не найдена кнопка открытия формы входа');
      return;
    }
    openLoginFormButton.click();
    const phoneRegex = /(\+?\d{11}|\d{10})/;
    if (phoneRegex.test(worker.Login)) {
      const phoneTab = (await getElement(
        phoneTabSelector,
        2000
      )) as HTMLElement;
      if (!phoneTab) {
        worker.Helper.WriteLine(
          'Ошибка: Не найдена кнопка переключения на вход по телефону'
        );
        return;
      }
      if (![...phoneTab.classList].includes('active')) {
        phoneTab.click();
        if (![...phoneTab.classList].includes('active')) {
          worker.Helper.WriteLine(
            'Ошибка: Не удалось переключиться на вход по телефону'
          );
          return;
        }
      }
      const phoneInput = (await getElement(
        phoneInputSelector,
        1000
      )) as HTMLInputElement;
      if (!phoneInput) {
        worker.Helper.WriteLine('Ошибка: Не найдено поле ввода телефона');
        return;
      }
      phoneInput.value = worker.Login;
    } else {
      const loginTab = (await getElement(
        loginTabSelector,
        2000
      )) as HTMLElement;
      if (!loginTab) {
        worker.Helper.WriteLine(
          'Ошибка: Не найдена кнопка переключения на вход по логину'
        );
        return;
      }
      if (![...loginTab.classList].includes('active')) {
        loginTab.click();
        if (![...loginTab.classList].includes('active')) {
          worker.Helper.WriteLine(
            'Ошибка: Не удалось переключиться на вход по логину'
          );
          return;
        }
      }
      const loginInput = await getElement(loginInputSelector, 1000);
      if (!loginInput) {
        worker.Helper.WriteLine('Ошибка: Не найдено поле ввода телефона');
        return;
      }
      // loginInput.value = worker.Login;
      setReactInputValue(loginInput, worker.Login);
    }
    const passwordInput = document.querySelector(passwordInputSelector);
    if (!passwordInput) {
      worker.Helper.WriteLine('Ошибка: Не найдено поле ввода пароля');
      return;
    }
    // passwordInput.value = worker.Password;
    setReactInputValue(passwordInput, worker.Password);
    const loginSubmitButton = document.querySelector(
      loginSubmitButtonSelector
    ) as HTMLElement;
    if (!loginSubmitButton) {
      worker.Helper.WriteLine('Ошибка: Не найдена кнопка входа');
      return;
    }
    loginSubmitButton.click();
    const accountButton = await getElement(accountButtonSelector);
    if (!accountButton) {
      worker.Helper.WriteLine(
        'Ошибка: Не удалось авторизоваться, проверьте логин и пароль'
      );
    } else {
      worker.Helper.WriteLine('Авторизация прошла успешно');
      worker.Islogin = true;
      worker.JSLogined();
    }
  } else {
    worker.Helper.WriteLine('Проверка авторизации');
    await loginCheckReady();
    worker.Islogin = checkLogin();
    worker.JSLogined();
    if (worker.Islogin) {
      worker.Helper.WriteLine('Уже авторизованы');
      const balanceLoaded = await awaiter(
        () => typeof getBalance() !== 'undefined'
      );
      if (!balanceLoaded) {
        worker.Helper.WriteLine('Баланс не появился');
      } else {
        updateBalance();
      }
      return;
    }
    if (document.querySelector('.wrong-password-tooltip')) {
      worker.Helper.WriteLine('Вы ввели неверный логин и/или пароль!');
      return;
    }
    worker.Helper.WriteLine('Нет авторизации. Ищем поле ввода логина');
    const loginInput = (await getElement(
      '.enter-block input[name="login"]'
    )) as HTMLInputElement;
    if (!loginInput) {
      worker.Helper.WriteLine(
        'Ошибка авторизации: Не найдено поле ввода логина'
      );
      return;
    }
    const passwordInput = (await getElement(
      '.enter-block input[name="passw"]'
    )) as HTMLInputElement;
    if (!passwordInput) {
      worker.Helper.WriteLine(
        'Ошибка авторизации: Не найдено поле ввода пароля'
      );
      return;
    }
    loginInput.value = worker.Login;
    passwordInput.value = worker.Password;
    fireEvent(loginInput, 'input');
    fireEvent(passwordInput, 'input');
    const loginSubmitButton = document.querySelector(
      'button.enterBtn'
    ) as HTMLElement;
    if (!loginSubmitButton) {
      worker.Helper.WriteLine(
        'Ошибка авторизации: Не найдена кнопка авторизации'
      );
      return;
    }
    loginSubmitButton.click();
    worker.Helper.WriteLine('Нажали на кнопку авторизации');
  }
};

export default authorize;
