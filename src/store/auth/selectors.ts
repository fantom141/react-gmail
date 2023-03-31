import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const authTokenSelector = createSelector(
  (state: RootState) => state.auth,
  auth => auth.token
);
