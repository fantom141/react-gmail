import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export interface FilterProps {
  onChange: (data: MessageControllerGetMessagesApiArg) => void;
}

export interface SentFilterValues {
  search: string;
}
