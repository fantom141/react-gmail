import { MessageDto } from '@/store/api/message-api';

export interface LeftPanelProps {
  openedMessage: MessageDto;
  open: (v: MessageDto) => void;
}
