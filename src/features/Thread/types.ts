import { MessageControllerGetMessagesApiArg, MessageDto, MessagePreferencesDto } from '@/store/api/message-api';

export interface ThreadProps {
  specificReqArgs: MessageControllerGetMessagesApiArg;
  openedMessage: MessageDto;
  onClose: () => void;
  onManagePreferences: (message: MessageDto, prefs: MessagePreferencesDto) => void;
  onCachedApiArgs: (args: MessageControllerGetMessagesApiArg) => void;
  onBatchTrash: (messageIds: number[]) => void;
  replyIsDisplayed?: boolean;
  onReply?: (message: MessageDto) => void;
}
