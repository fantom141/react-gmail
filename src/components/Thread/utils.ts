import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export const getDefaultFilterParams = (threadId: number): MessageControllerGetMessagesApiArg => ({
  threadId,
  page: 0,
  size: -1,
  sort: ['createdAt,asc'],
});
