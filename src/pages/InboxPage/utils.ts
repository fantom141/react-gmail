import { enhancedApi as messageApi, MessageControllerGetMessagesApiArg, MessagePreferencesDto } from '@/store/api/message-api';

export const getInboxListPatchAction = (messageId: number, prefs: MessagePreferencesDto, args: MessageControllerGetMessagesApiArg) =>
  messageApi.util.updateQueryData('messageControllerGetMessages', args, draft => {
    if (prefs.isFavourite != null || prefs.isRead != null) {
      draft.content = draft.content.map(el => {
        if (el.messageId === messageId) {
          return { ...el, ...prefs };
        }

        return el;
      });
    }

    if (prefs.isTrash != null || prefs.isSpam != null) {
      draft.content = draft.content.filter(el => el.messageId !== messageId);
    }
  });
