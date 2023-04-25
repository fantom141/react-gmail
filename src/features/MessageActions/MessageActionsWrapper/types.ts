import { PropsWithChildren } from 'react';

export interface MessageActionsWrapperProps extends PropsWithChildren {}

export interface MessageActionsWrapperRef {
  getItemClassNames: (isDisplayed: boolean) => string;
}
