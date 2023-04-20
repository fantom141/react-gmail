import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from './state';
import { ColorSchemes } from './types';
import { localStorageService } from '@/services';
import { LocalStorageKeys } from '@/configs';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    colorScheme: localStorageService.get(LocalStorageKeys.COLOR_SCHEME) || ColorSchemes.LIGHT,
  } as CommonState,
  reducers: {
    setInProgress: (state, { payload }: PayloadAction<boolean>) => {
      state.inProgress = payload;
    },
    setColorScheme: (state, { payload }: PayloadAction<ColorSchemes>) => {
      state.colorScheme = payload;
    },
  },
});

export const { setInProgress: setInProgressAction, setColorScheme: setColorSchemeAction } = commonSlice.actions;
