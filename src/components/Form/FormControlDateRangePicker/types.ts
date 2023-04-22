import { FormControlBaseProps } from '../FormControlBaseProps';
import { FieldPath } from 'react-hook-form/dist/types';

export interface FormControlDateRangePickerProps<V, N extends FieldPath<V>> extends FormControlBaseProps<V, N> {
  label?: string;
  placeholders?: [string, string];
}
