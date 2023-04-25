import { HTMLAttributes } from 'react';
import { MessagePreferencesDto } from '@/store/api/message-api';

export interface ActionsProps extends HTMLAttributes<HTMLElement>, MessagePreferencesDto {
  isDisplayed: boolean;
  onManagePreferences: (prefs: MessagePreferencesDto) => void;
}
