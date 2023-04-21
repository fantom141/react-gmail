import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { baseApi } from './api/base-api';
import { commonSlice } from '@/store/common';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [commonSlice.name]: commonSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const rootStoreSelector = (state: RootState) => state;
