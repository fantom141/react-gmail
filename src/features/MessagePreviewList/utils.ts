import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export const getPredefinedReqArgs = (specificArgs: MessageControllerGetMessagesApiArg): MessageControllerGetMessagesApiArg => ({
  ...specificArgs,
  page: 0,
  size: 20,
  sort: ['createdAt,desc'],
});
