import { FilterProps, SentFilterValues } from './types';
import { MessageListFilter } from '@/features/MessageListFilter';
import { useForm } from 'react-hook-form';
import { prepareFilterValuesToOutput } from './utils';
import { FormControlCheckbox, FormControlDateRangePicker, FormControlInput } from '@/components/Form';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<SentFilterValues>();
  const onSubmit = (val: SentFilterValues) => onChange(prepareFilterValuesToOutput(val));

  return (
    <MessageListFilter
      control={control}
      onHandleSubmit={handleSubmit(onSubmit)}
      resetFn={reset}
    >
      <>
        <FormControlInput
          control={control}
          name="recipientEmail"
          label="Recipient Email"
          placeholder="example@provider.domain"
        />

        <FormControlDateRangePicker
          control={control}
          name="dateSent"
          label="Date Sent"
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
