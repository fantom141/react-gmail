import { MessageDto } from '@/store/api/message-api';
import { ReactElement } from 'react';

export interface MessageDetailsProps {
  data: MessageDto;
  renderActions: ReactElement;
  isOpened?: boolean;
}
