import Request from '../request';

const request = new Request();

let balance: number;

request.subscribe('https://www.olimp.bet/api/user/balance', (
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
        balance = json.data;
        // console.log(`Баланс: ${balance}`);
        worker.JSBalanceChange(balance);
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

const getBalance = (): number => balance;

export const updateBalance = (): void => {
  console.log(`balance = ${balance}`);
  worker.JSBalanceChange(balance);
};

export default getBalance;
