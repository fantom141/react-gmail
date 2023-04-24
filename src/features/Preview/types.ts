import { HTMLAttributes, ReactElement } from 'react';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  subject: string;
  content: string;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isOpened: boolean;
  renderActionsElement: (cursorOver: boolean) => ReactElement;
}
