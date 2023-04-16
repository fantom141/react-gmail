import { MessageControllerGetMessagesApiArg, MessageDto, MessagePreferencesDto } from '@/store/api/message-api';
import { ReactElement } from 'react';

export interface MessagePreviewListProps {
  specificReqArgs: MessageControllerGetMessagesApiArg;
  openedMessage: MessageDto;
  renderFilterElement: (change: (values: MessageControllerGetMessagesApiArg) => void) => ReactElement;
  onOpen: (v: MessageDto) => void;
  onManagePreferences: (messageId: number, prefs: MessagePreferencesDto) => void;
  onCachedApiArgs: (args: MessageControllerGetMessagesApiArg) => void;
}
