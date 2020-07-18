import isCupis from '../isCupis';

const setBetAcceptMode = (): boolean => {
  if (isCupis()) {
    const betAcceptModes = [
      ...document.querySelectorAll('.settings__SettingsTab-sc-1labr3k-2'),
    ] as HTMLElement[];
    const mode = ((): HTMLElement => {
      switch (worker.StakeAcceptRuleShoulder) {
        case 0:
          return betAcceptModes.find(
            (element) => element.textContent.trim() === 'Никогда'
          );
        case 1:
          return betAcceptModes.find(
            (element) => element.textContent.trim() === 'При повышении'
          );
        case 2:
          return betAcceptModes.find(
            (element) => element.textContent.trim() === 'Всегда'
          );
        default:
          return null;
      }
    })();
    if (!mode) {
      worker.Helper.WriteLine('Не найдена нужная опция режима принятия ставки');
      return false;
    }
    mode.click();
    return true;
  }
  const betAcceptModes = [
    ...document.querySelectorAll('.koef_ch_radio .radio-item'),
  ] as HTMLElement[];
  const mode = ((): HTMLElement => {
    switch (worker.StakeAcceptRuleShoulder) {
      case 0:
        return betAcceptModes.find(
          (element) => element.textContent.trim() === 'никогда'
        );
      case 1:
        return betAcceptModes.find(
          (element) => element.textContent.trim() === 'при повышении'
        );
      case 2:
        return betAcceptModes.find(
          (element) => element.textContent.trim() === 'всегда'
        );
      default:
        return null;
    }
  })();
  if (!mode) {
    worker.Helper.WriteLine('Не найдена нужная опция режима принятия ставки');
    return false;
  }
  const modeInput = mode.querySelector('input');
  if (!modeInput) {
    worker.Helper.WriteLine(
      'Не найдена радиокнопка нужной опции режима принятия ставки'
    );
    return false;
  }
  modeInput.click();
  return true;
};

export default setBetAcceptMode;
