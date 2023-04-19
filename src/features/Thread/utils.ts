import { enhancedApi as messageApi, MessageControllerGetMessagesApiArg, MessageDto } from '@/store/api/message-api';

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

export const getReplyPatchAction = (message: MessageDto, args: MessageControllerGetMessagesApiArg) =>
  messageApi.util.updateQueryData('messageControllerGetMessages', args, draft => {
    draft.content.push(message);
  });

export const THREAD_LIST_ID = 'thread-list';
