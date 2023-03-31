import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './state';
import { getAuth } from 'firebase/auth';

export const syncAuthState = createAsyncThunk('auth/syncAuthState', async (forceRefresh: boolean, thunkAPI): Promise<AuthState> => {
  const curUser = getAuth().currentUser;
  const { token, expirationTime } = await curUser.getIdTokenResult(forceRefresh);

  return { token, expirationTime, email: curUser.email };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {} as AuthState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<AuthState>) => {
      return payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(syncAuthState.fulfilled, (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    });
  },
});

export const { setAuth } = authSlice.actions;
