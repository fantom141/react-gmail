import { MessageDto } from '@/store/api/message-api';
import { ReactElement } from 'react';

export interface HeaderProps {
  message: MessageDto;
  actions: ReactElement;
}
