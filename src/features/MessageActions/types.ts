import { MessagePreferencesDto } from '@/store/api/message-api';
import { HTMLAttributes } from 'react';

export interface MessageActionsProps extends HTMLAttributes<HTMLDivElement>, Required<MessagePreferencesDto> {
  isDisplayed: boolean;
  onManagePreferences: (prefs: MessagePreferencesDto) => void;
}
