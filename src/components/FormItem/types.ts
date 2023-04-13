import { PropsWithChildren } from 'react';

interface Props {
  label?: string;
  help?: string;
}
export interface FormItemProps extends PropsWithChildren<Props> {}
