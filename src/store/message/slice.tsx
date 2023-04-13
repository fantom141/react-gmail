import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageState } from './state';
import { MessageDto } from '../api/message-api';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {} as MessageState,
  reducers: {
    openMessage: (state, { payload }: PayloadAction<MessageDto>) => {
      state.selected = payload;
    },
    closeMessage: state => {
      state.selected = null;
    },
  },
});

export const { openMessage, closeMessage } = messageSlice.actions;
