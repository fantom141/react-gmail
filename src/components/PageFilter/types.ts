import { Control } from 'react-hook-form/dist/types/form';
import { ReactNode } from 'react';

export interface PageFilterProps<T extends { search: string } = { search: string }> {
  control: Control<T>;
  handleSubmit: (...args: any[]) => unknown;
  suffix?: ReactNode;
}
