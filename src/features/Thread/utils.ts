import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export const getPredefinedReqArgs = (
  threadId: number,
  specificArgs: MessageControllerGetMessagesApiArg
): MessageControllerGetMessagesApiArg => ({
  threadId,
  ...specificArgs,
  page: 0,
  size: -1,
  sort: ['createdAt,asc'],
});
