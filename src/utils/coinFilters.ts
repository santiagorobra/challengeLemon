import type { Coin, GetCoinsParams } from 'services/coinGeckoApi';

const filterByMinPrice = (coin: Coin, min?: number) =>
  min === undefined || coin.current_price >= min;

const filterByMaxPrice = (coin: Coin, max?: number) =>
  max === undefined || coin.current_price <= max;

const filterPositiveChange = (coin: Coin) =>
  coin.price_change_percentage_24h > 0;

const filterNegativeChange = (coin: Coin) =>
  coin.price_change_percentage_24h < 0;

const sortByChangeDesc = (a: Coin, b: Coin) =>
  b.price_change_percentage_24h - a.price_change_percentage_24h;

const sortByChangeAsc = (a: Coin, b: Coin) =>
  a.price_change_percentage_24h - b.price_change_percentage_24h;

export const applyFilters = (
  coins: Coin[],
  { price_min, price_max, variation }: GetCoinsParams
) => {
  let data = coins
    .filter(c => filterByMinPrice(c, price_min))
    .filter(c => filterByMaxPrice(c, price_max));

  if (variation === 'positive') {
    return data.filter(filterPositiveChange).sort(sortByChangeDesc);
  }

  if (variation === 'negative') {
    return data.filter(filterNegativeChange).sort(sortByChangeAsc);
  }

  return data;
};
