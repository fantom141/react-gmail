import { MessageDto } from '@/store/api/message-api';
import { ReactElement } from 'react';

export interface MessageDetailsProps {
  data: MessageDto;
  renderActionsElement: ReactElement;
  isOpened?: boolean;
}
