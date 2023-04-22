import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { SentFilterValues } from './types';

export const prepareFilterValuesToOutput = ({
  search,
  recipientEmail,
  dateSent,
  isRead,
  isUnread,
}: SentFilterValues): MessageControllerGetMessagesApiArg => {
  const [from, to] = dateSent || [];

  return {
    search,
    recipientEmail,
    createdDateFrom: from ? from.format('YYYY-MM-DD') : undefined,
    createdDateTo: to ? to.format('YYYY-MM-DD') : undefined,
    isRead: isRead || isUnread ? isRead || !isUnread : undefined,
  };
};
