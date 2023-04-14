import { MessageControllerGetCountApiArg } from '@/store/api/message-api';

export const getInboxCountStoreQueryArgs = (recipientEmail: string): MessageControllerGetCountApiArg => ({ recipientEmail });
export const getUnreadCountStoreQueryArgs = (recipientEmail: string): MessageControllerGetCountApiArg => ({
  recipientEmail,
  isRead: false,
});
export const getSentCountStoreQueryArgs = (senderEmail: string): MessageControllerGetCountApiArg => ({ senderEmail });
export const getDraftsCountStoreQueryArgs = (): undefined => undefined;
export const getFavouritesCountStoreQueryArgs = (): MessageControllerGetCountApiArg => ({ isFavourite: true });
export const getSpamCountStoreQueryArgs = (): MessageControllerGetCountApiArg => ({ isSpam: true });
export const getTrashCountStoreQueryArgs = (): MessageControllerGetCountApiArg => ({ isTrash: true });
