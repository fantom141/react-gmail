import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { SentFilterValues } from './types';

export const prepareFilterValuesToOutput = ({
  search,
  senderEmail,
  recipientEmail,
  dateReceivedSent,
}: SentFilterValues): MessageControllerGetMessagesApiArg => {
  const [from, to] = dateReceivedSent || [];

  return {
    search,
    senderEmail,
    recipientEmail,
    createdDateFrom: from ? from.format('YYYY-MM-DD') : undefined,
    createdDateTo: to ? to.format('YYYY-MM-DD') : undefined,
  };
};
