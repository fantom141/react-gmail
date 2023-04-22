import { Dayjs } from 'dayjs';
import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export interface FilterProps {
  onChange: (data: MessageControllerGetMessagesApiArg) => void;
}

export interface SentFilterValues {
  search: string;
  recipientEmail?: string;
  dateSent?: [Dayjs, Dayjs];
  isRead?: boolean;
  isUnread?: boolean;
}
