import { combineReducers } from '@reduxjs/toolkit';

import { coinGeckoApi } from 'services/coinGeckoApi';
import auth from './authSlice';
import scannerHistory from './scannerHistorySlice';

const rootReducer = combineReducers({
  auth,
  scannerHistory,
  [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
