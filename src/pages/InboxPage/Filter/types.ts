import { Dayjs } from 'dayjs';
import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { Control } from 'react-hook-form/dist/types/form';

export interface FilterProps {
  change: (data: MessageControllerGetMessagesApiArg) => void;
}

export interface FilterSettingsProps {
  control: Control<InboxFilterValues>;
  reset: () => void;
  apply: () => void;
}

export interface InboxFilterValues {
  search: string;
  senderEmail?: string;
  dateReceived?: [Dayjs, Dayjs];
}
