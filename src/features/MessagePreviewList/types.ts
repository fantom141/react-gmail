import { MessageControllerGetMessagesApiArg, MessageDto, MessagePreferencesDto } from '@/store/api/message-api';
import { ReactElement } from 'react';

export interface MessagePreviewListProps {
  specificReqArgs: MessageControllerGetMessagesApiArg;
  openedMessage: MessageDto;
  renderFilterElement: (change: (values: MessageControllerGetMessagesApiArg) => void) => ReactElement;
  open: (v: MessageDto) => void;
  managePreferences: (messageId: number, prefs: MessagePreferencesDto) => void;
  emitCachedApiArgs: (args: MessageControllerGetMessagesApiArg) => void;
}
