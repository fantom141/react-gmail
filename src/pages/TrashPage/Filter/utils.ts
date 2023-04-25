import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { TrashFilterValues } from './types';

export const prepareFilterValuesToOutput = ({ search }: TrashFilterValues): MessageControllerGetMessagesApiArg => {
  return {
    search,
  };
};
