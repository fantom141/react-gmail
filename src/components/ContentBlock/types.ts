import { HTMLAttributes, PropsWithChildren } from 'react';

export interface ContentBlockProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  skipVerticalIndent?: boolean;
  skipHorizontalIndent?: boolean;
  transparent?: boolean;
  borderRadius?: boolean;
}
