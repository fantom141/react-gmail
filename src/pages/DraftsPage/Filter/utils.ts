import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { DraftsFilterValues } from './types';

export const prepareFilterValuesToOutput = ({ search }: DraftsFilterValues): MessageControllerGetMessagesApiArg => {
  return {
    search,
  };
};
