import { configureStore } from '@reduxjs/toolkit';
import { isDev } from '@constants/nodeEnv';

import reducer from './rootReducer';

const store = configureStore({
  reducer,
  devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
