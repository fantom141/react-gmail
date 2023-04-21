import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { Dayjs } from 'dayjs';

export interface FilterProps {
  onChange: (data: MessageControllerGetMessagesApiArg) => void;
}

export interface SentFilterValues {
  search: string;
  recipientEmail?: string;
  dateReceived?: [Dayjs, Dayjs];
  isRead?: boolean;
  isUnread?: boolean;
}
