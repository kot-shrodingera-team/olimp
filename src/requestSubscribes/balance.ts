import { setBalance } from '../stakeInfo/getBalance';
import isCupis from '../isCupis';

if (isCupis()) {
  window.request.subscribe('https://www.olimp.bet/api/user/balance', (
    url: string,
    data: string,
    method: string /* , fullUrl: string */
  ) => {
    // console.log('Ответ от https://www.olimp.bet/api/user/balance');
    try {
      if (method === 'post') {
        const json = JSON.parse(decodeURIComponent(data));
        // console.dir(json);
        if (Object.prototype.hasOwnProperty.call(json, 'data')) {
          setBalance(json.data);
        }
      }
    } catch (e) {
      console.error(`Ошибка обработки ответа от ${url} - ${e}`);
      if (e instanceof URIError) {
        console.error(`Ошибка декодирования URI - ${data}`);
      } else if (e instanceof SyntaxError) {
        console.error(`Ошибка парсинга JSON - ${decodeURIComponent(data)}`);
      }
    }
  });
  // } else {
  //   window.request.subscribe('https://olimp.com/tick_index.php', (
  //     url,
  //     data /* , method, fullUrl */
  //   ) => {
  //     console.log('/tick_index.php response');
  //     // if (method === 'post') {
  //     // var json = JSON.parse(b64DecodeUnicode(data));
  //     const json = JSON.parse(decodeURIComponent(data));
  //     if (json.svc && json.svc.balance && json.svc.balance.currsum) {
  //       const balance = Number(
  //         json.svc.balance.currsum
  //           .replace("'", '')
  //           .replace("'", '')
  //           .split(', ')[0]
  //           .trim()
  //       );
  //       setBalance(balance);
  //       // worker.Helper.WriteLine('Обновлен баланс ' + balance);
  //     }
  //     // }
  //   });
}
