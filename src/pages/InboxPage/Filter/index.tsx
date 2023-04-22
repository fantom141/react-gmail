import { FilterProps } from './types';
import { MessageListFilter } from '@/features/MessageListFilter';
import { useForm } from 'react-hook-form';
import { InboxFilterValues } from './types';
import { prepareFilterValuesToOutput } from './utils';
import { FormControlInput, FormControlDateRangePicker, FormControlCheckbox } from '@/components/Form';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<InboxFilterValues>();
  const onSubmit = (val: InboxFilterValues) => onChange(prepareFilterValuesToOutput(val));

  return (
    <MessageListFilter
      control={control}
      onHandleSubmit={handleSubmit(onSubmit)}
      resetFn={reset}
    >
      <>
        <FormControlInput
          control={control}
          name="senderEmail"
          label="Sender Email"
          placeholder="example@provider.domain"
        />

        <FormControlDateRangePicker
          control={control}
          name="dateReceived"
          label="Date Received"
          placeholders={['From', 'To']}
        />

        <FormControlCheckbox
          control={control}
          name="isRead"
          label="Is Read"
        />

        <FormControlCheckbox
          control={control}
          name="isUnread"
          label="Is Unread"
        />
      </>
    </MessageListFilter>
  );
};
