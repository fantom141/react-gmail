import { Dayjs } from 'dayjs';
import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export interface FilterProps {
  onChange: (data: MessageControllerGetMessagesApiArg) => void;
}

export interface InboxFilterValues {
  search: string;
  senderEmail?: string;
  dateReceived?: [Dayjs, Dayjs];
}
