import { MessageControllerGetMessagesApiArg, MessageDto, MessagePreferencesDto } from '@/store/api/message-api';

export interface ThreadProps {
  specificReqArgs: MessageControllerGetMessagesApiArg;
  openedMessage: MessageDto;
  close: () => void;
  managePreferences: (messageId: number, prefs: MessagePreferencesDto) => void;
  emitCachedApiArgs: (args: MessageControllerGetMessagesApiArg) => void;
}
