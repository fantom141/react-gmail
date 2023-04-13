import { MessageDto } from '@/store/api/message-api';

export interface MessageListProps {
  isFetching: boolean;
  dataSource: MessageDto[];
  open: (message: MessageDto) => void;
  openedMessageId: number;
}
