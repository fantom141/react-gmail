import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from './state';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {} as CommonState,
  reducers: {
    setInProgress: (state, { payload }: PayloadAction<boolean>) => {
      state.inProgress = payload;
    },
  },
});

export const { setInProgress: setInProgressAction } = commonSlice.actions;
