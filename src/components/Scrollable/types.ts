import { PropsWithChildren } from 'react';

export interface ScrollableProps extends PropsWithChildren {
  maxHeight?: string;
}

export interface ScrollableRef {
  scrollBottom: () => void;
  scrollByIdAttr: (idAttr: string) => HTMLElement;
}
