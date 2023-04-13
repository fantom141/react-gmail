import { baseApi as api } from './base-api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    messageControllerGetMessages: build.query<MessageControllerGetMessagesApiResponse, MessageControllerGetMessagesApiArg>({
      query: queryArg => ({
        url: `/messages`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
          senderEmail: queryArg.senderEmail,
          recipientEmail: queryArg.recipientEmail,
          isFavourite: queryArg.isFavourite,
          isSpam: queryArg.isSpam,
          isRead: queryArg.isRead,
          isTrash: queryArg.isTrash,
          threadId: queryArg.threadId,
          createdDateFrom: queryArg.createdDateFrom,
          createdDateTo: queryArg.createdDateTo,
        },
      }),
    }),
    messageControllerCreateMessage: build.mutation<MessageControllerCreateMessageApiResponse, MessageControllerCreateMessageApiArg>({
      query: queryArg => ({ url: `/messages`, method: 'POST', body: queryArg.createMessageDto }),
    }),
    messageControllerDeleteMessage: build.mutation<MessageControllerDeleteMessageApiResponse, MessageControllerDeleteMessageApiArg>({
      query: queryArg => ({ url: `/messages/${queryArg.messageId}`, method: 'DELETE' }),
    }),
    messageControllerGetCount: build.query<MessageControllerGetCountApiResponse, MessageControllerGetCountApiArg>({
      query: queryArg => ({
        url: `/messages/count`,
        params: {
          senderEmail: queryArg.senderEmail,
          recipientEmail: queryArg.recipientEmail,
          isFavourite: queryArg.isFavourite,
          isSpam: queryArg.isSpam,
          isRead: queryArg.isRead,
          isTrash: queryArg.isTrash,
        },
      }),
    }),
    messageControllerManagePreferences: build.mutation<
      MessageControllerManagePreferencesApiResponse,
      MessageControllerManagePreferencesApiArg
    >({
      query: queryArg => ({ url: `/messages/${queryArg.messageId}/preferences`, method: 'PUT', body: queryArg.messagePreferencesDto }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type MessageControllerGetMessagesApiResponse = /** status 200  */ MessagePageResDto;
export type MessageControllerGetMessagesApiArg = {
  search?: string;
  page?: number;
  /** "-1" to get all */
  size?: number;
  sort?: string[];
  senderEmail?: string;
  recipientEmail?: string;
  isFavourite?: boolean;
  isSpam?: boolean;
  isRead?: boolean;
  isTrash?: boolean;
  threadId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
};
export type MessageControllerCreateMessageApiResponse = /** status 201  */ MessageDto;
export type MessageControllerCreateMessageApiArg = {
  createMessageDto: CreateMessageDto;
};
export type MessageControllerDeleteMessageApiResponse = /** status 200  */ MessageDto;
export type MessageControllerDeleteMessageApiArg = {
  messageId: number;
};
export type MessageControllerGetCountApiResponse = /** status 200  */ number;
export type MessageControllerGetCountApiArg = {
  senderEmail?: string;
  recipientEmail?: string;
  isFavourite?: boolean;
  isSpam?: boolean;
  isRead?: boolean;
  isTrash?: boolean;
};
export type MessageControllerManagePreferencesApiResponse = /** status 200  */ MessageDto;
export type MessageControllerManagePreferencesApiArg = {
  messageId: number;
  messagePreferencesDto: MessagePreferencesDto;
};
export type UserDto = {
  email: string;
  firstName?: string;
  lastName?: string;
};
export type MessageDto = {
  messageId: number;
  subject?: string;
  content: string;
  createdAt: string;
  threadId: number;
  sender: UserDto;
  recipient: UserDto;
  isFavourite: boolean;
  isSpam: boolean;
  isRead: boolean;
  isTrash: boolean;
};
export type MessagePageResDto = {
  content: MessageDto[];
  empty: boolean;
  first: boolean;
  last: boolean;
  page: number;
  numberOfElements: number;
  size: number;
  sort: string[];
  totalElements: number;
  totalPages: number;
};
export type CreateMessageDto = {
  email: string;
  subject?: string;
  content: string;
  threadId?: number;
};
export type MessagePreferencesDto = {
  senderEmail?: string;
  recipientEmail?: string;
  isFavourite?: boolean;
  isSpam?: boolean;
  isRead?: boolean;
  isTrash?: boolean;
};
export const {
  useMessageControllerGetMessagesQuery,
  useLazyMessageControllerGetMessagesQuery,
  useMessageControllerCreateMessageMutation,
  useMessageControllerDeleteMessageMutation,
  useMessageControllerGetCountQuery,
  useLazyMessageControllerGetCountQuery,
  useMessageControllerManagePreferencesMutation,
} = injectedRtkApi;
