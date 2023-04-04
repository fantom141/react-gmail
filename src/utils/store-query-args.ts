import { MessagePreferencesDto } from '@/store/api/message-api';

export const getInboxCountStoreQueryArgs = (recipientEmail: string): MessagePreferencesDto => ({ recipientEmail });
export const getUnreadCountStoreQueryArgs = (recipientEmail: string): MessagePreferencesDto => ({ recipientEmail, isRead: false });
export const getSentCountStoreQueryArgs = (senderEmail: string): MessagePreferencesDto => ({ senderEmail });
export const getDraftsCountStoreQueryArgs = (): undefined => undefined;
export const getFavouritesCountStoreQueryArgs = (): MessagePreferencesDto => ({ isFavourite: true });
export const getSpamCountStoreQueryArgs = (): MessagePreferencesDto => ({ isSpam: true });
export const getTrashCountStoreQueryArgs = (): MessagePreferencesDto => ({ isTrash: true });
