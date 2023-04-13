import { MessageDto } from '@/store/api/message-api';
import { HTMLAttributes } from 'react';

export interface MessageActionsProps
  extends Pick<MessageDto, 'isRead' | 'isFavourite' | 'isSpam' | 'isTrash'>,
    HTMLAttributes<HTMLDivElement> {
  isDisplayed: boolean;
}
