import { FormControlDateRangePickerProps } from './types';
import { FormItem } from '../FormItem';
import { DatePicker } from 'antd';
import { Controller } from 'react-hook-form';
import React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';

const { RangePicker } = DatePicker;

export const FormControlDateRangePicker = <V extends FieldValues, N extends FieldPath<V>>({
  control,
  name,
  label,
  placeholders,
}: FormControlDateRangePickerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem label={label}>
          <RangePicker
            {...field}
            allowEmpty={[true, true]}
            allowClear
            inputReadOnly
            placeholder={placeholders}
          />
        </FormItem>
      )}
    />
  );
};
