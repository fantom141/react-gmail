import { HTMLAttributes, ReactElement } from 'react';
import { DraftDto } from '@/store/api/draft-api';

export interface DraftPreviewProps extends HTMLAttributes<HTMLDivElement> {
  data: DraftDto;
  isOpened: boolean;
  renderActionsElement: (cursorOver: boolean) => ReactElement;
}
