const isCupis = (): boolean =>
  /^(www\.)?olimp.bet$/.test(window.location.hostname);

export default isCupis;
