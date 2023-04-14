import { MessageControllerGetMessagesApiArg, MessageDto, MessagePreferencesDto } from '@/store/api/message-api';

export interface ThreadProps {
  openedMessage: MessageDto;
  close: () => void;
  managePreferences: (messageId: number, prefs: MessagePreferencesDto) => void;
  emitCachedApiArgs: (args: MessageControllerGetMessagesApiArg) => void;
}
