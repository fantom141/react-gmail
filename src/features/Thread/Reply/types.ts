import { HTMLAttributes } from 'react';
import { MessageDto } from '@/store/api/message-api';

export interface ReplyProps extends HTMLAttributes<HTMLDivElement> {
  openedMessage: MessageDto;
  onMessageSent: (message: MessageDto) => void;
}

export type ReplyFormValues = {
  subject?: string;
  content: string;
};
