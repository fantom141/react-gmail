import { HTMLAttributes } from 'react';

export interface DraftPreviewActionsProps extends HTMLAttributes<HTMLElement> {
  isDisplayed: boolean;
  onDelete: () => void;
}
