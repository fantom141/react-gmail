import { Control } from 'react-hook-form/dist/types/form';
import { PropsWithChildren } from 'react';

export interface MessageListFilterProps<T extends { search: string } = { search: string }> extends PropsWithChildren {
  control: Control<T>;
  onHandleSubmit: (...args: any[]) => unknown;
  resetFn: () => void;
}
