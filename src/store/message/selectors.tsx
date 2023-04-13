import { RootState, rootStoreSelector } from '../store';

export const openedMessageSelector = (state: RootState) => rootStoreSelector(state).message.selected;
