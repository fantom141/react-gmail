import { FilterProps, TrashFilterValues } from './types';
import { MessageListFilter } from '@/features/MessageListFilter';
import { useForm } from 'react-hook-form';
import { prepareFilterValuesToOutput } from './utils';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<TrashFilterValues>();
  const onSubmit = (val: TrashFilterValues) => onChange(prepareFilterValuesToOutput(val));

  return (
    <MessageListFilter
      control={control}
      onHandleSubmit={handleSubmit(onSubmit)}
      resetFn={reset}
    />
  );
};
