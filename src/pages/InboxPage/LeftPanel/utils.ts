import { MessageControllerGetMessagesApiArg } from '@/store/api/message-api';

export const getDefaultFilterParams = (recipientEmail: string): MessageControllerGetMessagesApiArg => ({
  recipientEmail,
  page: 0,
  size: 20,
  sort: ['createdAt,desc'],
});
