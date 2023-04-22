import { FormControlBaseProps } from '../FormControlBaseProps';
import { FieldPath } from 'react-hook-form/dist/types';

export interface FormControlCheckboxProps<V, N extends FieldPath<V>> extends FormControlBaseProps<V, N> {
  label?: string;
}
