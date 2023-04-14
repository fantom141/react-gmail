import { MessageControllerGetMessagesApiArg, MessageDto, MessagePreferencesDto } from '@/store/api/message-api';

export interface LeftPanelProps {
  openedMessage: MessageDto;
  open: (v: MessageDto) => void;
  managePreferences: (messageId: number, prefs: MessagePreferencesDto) => void;
  emitCachedApiArgs: (args: MessageControllerGetMessagesApiArg) => void;
}
