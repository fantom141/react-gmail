import { FilterProps, SentFilterValues } from './types';
import { MessageListFilter } from '@/features/MessageListFilter';
import { useForm } from 'react-hook-form';
import { prepareFilterValuesToOutput } from './utils';
import { FormControlDateRangePicker, FormControlInput } from '@/components/Form';

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
          name="senderEmail"
          label="Sender Email"
          placeholder="example@provider.domain"
        />

        <FormControlInput
          control={control}
          name="recipientEmail"
          label="Recipient Email"
          placeholder="example@provider.domain"
        />

        <FormControlDateRangePicker
          control={control}
          name="dateReceivedSent"
          label="Date Received/Sent"
          placeholders={['From', 'To']}
        />
      </>
    </MessageListFilter>
  );
};
