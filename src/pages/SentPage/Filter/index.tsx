import { useForm } from 'react-hook-form';
import { FilterProps, SentFilterValues } from './types';
import React, { useRef } from 'react';
import { MessageListFilter } from '@/features/MessageListFilter';
import { prepareFilterValuesToOutput } from './utils';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit } = useForm<SentFilterValues>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (val: SentFilterValues) => onChange(prepareFilterValuesToOutput(val));

  return (
    <MessageListFilter
      control={control}
      onHandleSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    />
  );
};
