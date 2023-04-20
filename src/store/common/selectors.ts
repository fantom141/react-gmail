import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const inProgressSelector = (state: RootState) => state.common.inProgress;
export const colorSchemeSelector = createSelector(
  (state: RootState) => state.common,
  common => common.colorScheme
);
