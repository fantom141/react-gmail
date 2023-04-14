import { MessageDto } from '@/store/api/message-api';
import { ReactElement } from 'react';

export interface MessageDetailsProps {
  data: MessageDto;
  actions: ReactElement;
  isOpened?: boolean;
}
