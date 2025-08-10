import { combineReducers } from '@reduxjs/toolkit';

import auth from './authSlice';

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
