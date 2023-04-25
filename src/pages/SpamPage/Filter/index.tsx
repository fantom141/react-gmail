import { FilterProps, SpamFilterValues } from './types';
import { MessageListFilter } from '@/features/MessageListFilter';
import { useForm } from 'react-hook-form';
import { prepareFilterValuesToOutput } from './utils';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<SpamFilterValues>();
  const onSubmit = (val: SpamFilterValues) => onChange(prepareFilterValuesToOutput(val));

  return (
    <MessageListFilter
      control={control}
      onHandleSubmit={handleSubmit(onSubmit)}
      resetFn={reset}
    />
  );
};
