import { combineReducers } from '@reduxjs/toolkit';

import { coinGeckoApi } from 'services/coinGeckoApi';

import auth from './authSlice';

const rootReducer = combineReducers({
  auth,
  [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
