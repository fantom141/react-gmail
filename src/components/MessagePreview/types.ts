import { HTMLAttributes } from 'react';
import { MessageDto } from '@/store/api/message-api';

export interface MessagePreviewProps extends HTMLAttributes<HTMLDivElement> {
  data: MessageDto;
  isOpened: boolean;
}
