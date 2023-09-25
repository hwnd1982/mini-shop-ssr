export const API_URL = 'https://lava-overjoyed-tern.glitch.me';
export const GOODS_URL = `${API_URL}/api/goods`;
export const CATEGOY_URL = `${API_URL}/api/categories`;
export const COLORS_URL = `${API_URL}/api/colors`;
export const ORDER_URL = `${API_URL}/api/order`;

interface Params {
  [index: string]: string;
}

export const getData = async (urlApi: string, params: Params | Function = {}, cbError = (err: string) => {}) => {
  try {
    const url = new URL(urlApi);

    if (params && typeof params !== 'function') {
      for (const key in params) {
        url.searchParams.set(key, params[key]);
      }
    }

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (err) {
    let message = 'Unknown Error'

    if (err instanceof Error) {
      console.warn(err.message);
      message = err.message;
    }
    if (typeof params === "function") {
      params(message);
    } else {
      cbError(message);
    }
    throw new Error(message);
  }
};

/** -------------------------------------------------------------------------------
Сервер Inspired запущен. Вы можете использовать его по адресу http://localhost:8024
Нажмите CTRL+C, чтобы остановить сервер
Доступные методы:
GET /api/goods - получить список всех товаров с пагинацией
GET /api/goods/{id} - получить товар по его ID
GET /api/categories - получить список категорий
GET /api/colors - получить список цветов
GET /api/goods?[param]
Параметры:
        gender
        category&gender
        search = поиск
        count = количество товаров (12)
        page = страница (1)
        list={id},{id} - получить список товаров по id
        exclude=id - исключить id
        top=true - топ товары

POST /api/order - оформить заказ (
          {
            fio: str,
            address: str,
            phone: str,
            email: str,
            delivery: bool,
            goods: [{id, count}]
          })
          no validate
--------------------------------------------------------------------*/