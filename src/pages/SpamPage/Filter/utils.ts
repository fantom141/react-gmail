import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { SpamFilterValues } from './types';

export const prepareFilterValuesToOutput = ({ search }: SpamFilterValues): MessageControllerGetMessagesApiArg => {
  return {
    search,
  };
};
