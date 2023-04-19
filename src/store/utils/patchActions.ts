import { enhancedApi as messageApi, MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { DraftControllerGetCountApiArg, enhancedApi as draftApi } from '@/store/api/draft-api';
import {
  getDraftsCountQueryArgs,
  getFavouritesCountQueryArgs,
  getInboxCountQueryArgs,
  getSentCountQueryArgs,
  getSpamCountQueryArgs,
  getTrashCountQueryArgs,
  getUnreadCountQueryArgs,
} from './queryArgs';

const messageCountIncrease = (args: MessageControllerGetMessagesApiArg, count: number) => messageApi.util.updateQueryData('messageControllerGetCount', args, draft => draft + count);
const messageCountDecrease = (args: MessageControllerGetMessagesApiArg, count: number) => messageApi.util.updateQueryData('messageControllerGetCount', args, draft => draft - count);
const draftCountIncrease = (args: DraftControllerGetCountApiArg, count: number) => draftApi.util.updateQueryData('draftControllerGetCount', args, draft => draft + count);
const draftCountDecrease = (args: DraftControllerGetCountApiArg, count: number) => draftApi.util.updateQueryData('draftControllerGetCount', args, draft => draft - count);

export const increaseInboxCountPatchAction = (recipientEmail: string, count: number = 1) => messageCountIncrease(getInboxCountQueryArgs(recipientEmail), count);
export const decreaseInboxCountPatchAction = (recipientEmail: string, count: number = 1) => messageCountDecrease(getInboxCountQueryArgs(recipientEmail), count);
export const increaseUnreadCountPatchAction = (recipientEmail: string, count: number = 1) => messageCountIncrease(getUnreadCountQueryArgs(recipientEmail), count);
export const decreaseUnreadCountPatchAction = (recipientEmail: string, count: number = 1) => messageCountDecrease(getUnreadCountQueryArgs(recipientEmail), count);
export const increaseSentCountPatchAction = (recipientEmail: string, count: number = 1) => messageCountIncrease(getSentCountQueryArgs(recipientEmail), count);
export const decreaseSentCountPatchAction = (recipientEmail: string, count: number = 1) => messageCountDecrease(getSentCountQueryArgs(recipientEmail), count);
export const increaseDraftsCountPatchAction = (count: number = 1) => draftCountIncrease(getDraftsCountQueryArgs(), count);
export const decreaseDraftsCountPatchAction = (count: number = 1) => draftCountDecrease(getDraftsCountQueryArgs(), count);
export const increaseFavouritesCountPatchAction = (count: number = 1) => messageCountIncrease(getFavouritesCountQueryArgs(), count);
export const decreaseFavouritesCountPatchAction = (count: number = 1) => messageCountDecrease(getFavouritesCountQueryArgs(), count);
export const increaseSpamCountPatchAction = (count: number = 1) => messageCountIncrease(getSpamCountQueryArgs(), count);
export const decreaseSpamCountPatchAction = (count: number = 1) => messageCountDecrease(getSpamCountQueryArgs(), count);
export const increaseTrashCountPatchAction = (count: number = 1) => messageCountIncrease(getTrashCountQueryArgs(), count);
export const decreaseTrashCountPatchAction = (count: number = 1) => messageCountDecrease(getTrashCountQueryArgs(), count);
