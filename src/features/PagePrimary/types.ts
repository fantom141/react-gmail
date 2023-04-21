import { MessageControllerGetMessagesApiArg, MessageDto } from '@/store/api/message-api';
import { User } from 'firebase/auth';
import { ReactElement } from 'react';

export interface PagePrimaryProps {
  user: User;
  listSpecificReqArgs: MessageControllerGetMessagesApiArg;
  threadSpecificReqArgs: MessageControllerGetMessagesApiArg;
  headerElement: ReactElement;
  filterRenderElement: (change: (values: MessageControllerGetMessagesApiArg) => void) => ReactElement;
  onRefresh: () => void;
  onMessageSent?: (message: MessageDto, listCachedArgs: MessageControllerGetMessagesApiArg) => void;
}
