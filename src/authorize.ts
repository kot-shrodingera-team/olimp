import { getElement, sleep } from '@kot-shrodingera-team/config/util';
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
import checkLogin from './getInfo/checkLogin';

const loginCheckReady = async (timeout = 10000): Promise<void> => {
  await Promise.race([
    getElement(openLoginFormButtonSelector, timeout),
    getElement(accountButtonSelector, timeout),
  ]);
  await sleep(3000);
};

const authorize = async (): Promise<void> => {
  worker.Helper.WriteLine('Проверка авторизации');
  await loginCheckReady();
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
    const phoneTab = (await getElement(phoneTabSelector, 2000)) as HTMLElement;
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
    const loginTab = (await getElement(loginTabSelector, 2000)) as HTMLElement;
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
};

export default authorize;
