import { Control } from 'react-hook-form/dist/types/form';
import { ReactNode } from 'react';

export interface MessageListFilterProps<T extends { search: string } = { search: string }> {
  control: Control<T>;
  onHandleSubmit: (...args: any[]) => unknown;
  suffix?: ReactNode;
}
