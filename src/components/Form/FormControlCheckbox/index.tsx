import { FormControlCheckboxProps } from './types';
import { Checkbox } from 'antd';
import { Controller } from 'react-hook-form';
import React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';

export const FormControlCheckbox = <V extends FieldValues, N extends FieldPath<V>>({
  control,
  name,
  label,
}: FormControlCheckboxProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...rest } }) => (
        <Checkbox
          {...rest}
          checked={value}
        >
          {label}
        </Checkbox>
      )}
    />
  );
};
