import { HTMLAttributes } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form/dist/types';

export interface FormControlBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends HTMLAttributes<HTMLElement> {
  control: Control<TFieldValues>;
  name: TName;
}
