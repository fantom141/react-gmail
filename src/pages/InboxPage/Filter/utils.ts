import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { InboxFilterValues } from './types';

export const prepareFilterValuesToOutput = ({
  search,
  senderEmail,
  dateReceived,
}: InboxFilterValues): MessageControllerGetMessagesApiArg => {
  const [from, to] = dateReceived || [];

  return {
    search,
    senderEmail,
    createdDateFrom: from ? from.format('YYYY-MM-DD') : undefined,
    createdDateTo: to ? to.format('YYYY-MM-DD') : undefined,
  };
};
