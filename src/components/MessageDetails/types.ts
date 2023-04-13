import { MessageDto } from '@/store/api/message-api';

export interface MessageDetailsProps {
  data: MessageDto;
  isOpened?: boolean;
}
