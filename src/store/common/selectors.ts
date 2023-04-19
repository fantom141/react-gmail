import { RootState } from '../store';

export const inProgressSelector = (state: RootState) => state.common.inProgress;
