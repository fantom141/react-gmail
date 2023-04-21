import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { SentFilterValues } from './types';

export const prepareFilterValuesToOutput = ({ search }: SentFilterValues): MessageControllerGetMessagesApiArg => {
  return {
    search,
  };
};
