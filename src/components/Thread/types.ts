import { MessageDto } from '@/store/api/message-api';

export interface ThreadProps {
  openedMessage: MessageDto;
  close: () => void;
}
