import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { syncAuthState } from '../auth';
import { Mutex } from 'async-mutex';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { token },
    } = getState() as RootState;

    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const mutex = new Mutex();
const baseQueryWithRefreshToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  const {
    auth: { token, expirationTime },
  } = api.getState() as RootState;

  if (!token || new Date(expirationTime).getTime() - 3 * 1000 <= new Date().getTime()) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      await api.dispatch(syncAuthState(true));

      release();
    } else {
      await mutex.waitForUnlock();
    }
  }

  return await baseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
