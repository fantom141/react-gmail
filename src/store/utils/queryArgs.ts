import { MessageControllerGetCountApiArg } from '@/store/api/message-api';

export const getInboxCountQueryArgs = (recipientEmail: string): MessageControllerGetCountApiArg => ({
  recipientEmail,
  isTrash: false,
  isSpam: false,
});
export const getUnreadCountQueryArgs = (recipientEmail: string): MessageControllerGetCountApiArg => ({
  recipientEmail,
  isRead: false,
  isTrash: false,
  isSpam: false,
});
export const getSentCountQueryArgs = (senderEmail: string): MessageControllerGetCountApiArg => ({
  senderEmail,
  isSpam: false,
  isTrash: false,
});
export const getDraftsCountQueryArgs = (): undefined => undefined;
export const getFavouritesCountQueryArgs = (): MessageControllerGetCountApiArg => ({
  isFavourite: true,
  isSpam: false,
  isTrash: false,
});
export const getSpamCountQueryArgs = (): MessageControllerGetCountApiArg => ({ isSpam: true, isTrash: false });
export const getTrashCountQueryArgs = (): MessageControllerGetCountApiArg => ({ isTrash: true });
