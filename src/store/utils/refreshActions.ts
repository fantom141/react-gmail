import { enhancedApi as messageApi, MessageControllerGetMessagesApiArg } from '@/store/api/message-api';
import { DraftControllerGetCountApiArg, enhancedApi as draftApi } from '@/store/api/draft-api';
import { getDraftsCountQueryArgs, getFavouritesCountQueryArgs, getInboxCountQueryArgs, getSentCountQueryArgs, getSpamCountQueryArgs, getTrashCountQueryArgs, getUnreadCountQueryArgs } from '@/store';

const getMessageCountsAction = (args: MessageControllerGetMessagesApiArg) => messageApi.util.prefetch('messageControllerGetCount', args, {force: true});
const getDraftCountsAction = (args: DraftControllerGetCountApiArg) => draftApi.util.prefetch('draftControllerGetCount', args, {force: true});

export const getInboxCountRefreshAction = (recipientEmail: string) => getMessageCountsAction(getInboxCountQueryArgs(recipientEmail));
export const getUnreadCountRefreshAction = (recipientEmail: string) => getMessageCountsAction(getUnreadCountQueryArgs(recipientEmail));
export const getSentCountRefreshAction = (recipientEmail: string) => getMessageCountsAction(getSentCountQueryArgs(recipientEmail));
export const getDraftCountRefreshAction = () => getDraftCountsAction(getDraftsCountQueryArgs());
export const getFavouritesCountRefreshAction = () => getMessageCountsAction(getFavouritesCountQueryArgs());
export const getSpamCountRefreshAction = () => getMessageCountsAction(getSpamCountQueryArgs());
export const getTrashCountRefreshAction = () => getMessageCountsAction(getTrashCountQueryArgs());
