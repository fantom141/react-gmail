import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { SentFilterValues } from './types';

export const prepareFilterValuesToOutput = ({
  search,
  recipientEmail,
  dateReceived,
  isRead,
  isUnread,
}: SentFilterValues): MessageControllerGetMessagesApiArg => {
  const [from, to] = dateReceived || [];

  return {
    search,
    recipientEmail,
    createdDateFrom: from ? from.format('YYYY-MM-DD') : undefined,
    createdDateTo: to ? to.format('YYYY-MM-DD') : undefined,
    isRead: isRead || isUnread ? isRead || !isUnread : undefined,
  };
};
