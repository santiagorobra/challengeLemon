import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { COINGECKO_API_BASE_URL, COINGECKO_API_KEY } from '@env';

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
};

type FiatCurrency = {
  id: string;
  symbol: string;
  name: string;
};

type GetCoinsParams = {
  vs_currency?: 'usd' | 'eur' | 'ars' | string;
  page?: number;
  per_page?: number;
  search?: string;
  price_min?: number;
  price_max?: number;
  variation?: 'positive' | 'negative';
};

const baseQuery = fetchBaseQuery({
  baseUrl: COINGECKO_API_BASE_URL,
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    headers.set('x-cg-demo-api-key', COINGECKO_API_KEY || '');
    return headers;
  },
  timeout: 10000,
});

const loggingBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log('[API Request]', args);
  const result = await baseQuery(args, api, extraOptions);
  console.log('[API Response]', result);
  return result;
};

export const coinGeckoApi = createApi({
  reducerPath: 'coinGeckoApi',
  baseQuery: loggingBaseQuery,
  tagTypes: ['Coins'],
  endpoints: builder => ({
    getCoins: builder.query<Coin[], GetCoinsParams>({
      query: ({
        vs_currency = 'usd',
        page = 1,
        per_page = 25,
        search,
      } = {}) => {
        const params = new URLSearchParams({
          vs_currency,
          page: String(page),
          per_page: String(per_page),
        });
        if (search) params.set('ids', encodeURIComponent(search));
        return `/coins/markets?${params.toString()}`;
      },
      transformResponse: (response: Coin[], _meta, arg) => {
        let data = response;
        if (arg?.price_min !== undefined)
          data = data.filter(c => c.current_price >= arg.price_min!);
        if (arg?.price_max !== undefined)
          data = data.filter(c => c.current_price <= arg.price_max!);
        if (arg?.variation === 'positive') {
          data = data
            .filter(c => c.price_change_percentage_24h > 0)
            .sort(
              (a, b) =>
                b.price_change_percentage_24h - a.price_change_percentage_24h,
            );
        }
        if (arg?.variation === 'negative') {
          data = data
            .filter(c => c.price_change_percentage_24h < 0)
            .sort(
              (a, b) =>
                a.price_change_percentage_24h - b.price_change_percentage_24h,
            );
        }
        return data;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const rest = { ...(queryArgs || {}) };
        delete rest.page;
        return `${endpointName}-${JSON.stringify(rest)}`;
      },
      merge: (currentCache, newItems) => {
        const merged = [...currentCache, ...newItems];
        const unique = Array.from(
          new Map(merged.map(item => [item.id, item])).values(),
        );
        currentCache.splice(0, currentCache.length, ...unique);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSupportedFiats: builder.query<FiatCurrency[], void>({
      query: () => '/simple/supported_vs_currencies',
      transformResponse: (response: string[]) =>
        response
          .filter(f => ['usd', 'eur', 'ars', 'pen'].includes(f.toLowerCase()))
          .map(f => ({
            id: f.toLowerCase(),
            symbol: f.toUpperCase(),
            name: f.toUpperCase(),
          })),
    }),
  }),
});

export const { useGetCoinsQuery, useGetSupportedFiatsQuery } = coinGeckoApi;
