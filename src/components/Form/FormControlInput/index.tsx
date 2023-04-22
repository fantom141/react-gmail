import { FormControlInputProps } from './types';
import { FormItem } from '../FormItem';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';

export const FormControlInput = <V extends FieldValues, N extends FieldPath<V>>({
  control,
  name,
  label,
  placeholder,
}: FormControlInputProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem label={label}>
          <Input
            {...field}
            allowClear
            placeholder={placeholder}
          />
        </FormItem>
      )}
    />
  );
};
