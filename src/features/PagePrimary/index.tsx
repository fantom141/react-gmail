import { Thread } from '@/features/Thread';
import { useDispatch } from 'react-redux';
import {
  AppDispatch,
  decreaseFavouritesCountPatchAction,
  decreaseInboxCountPatchAction,
  decreaseSentCountPatchAction,
  decreaseUnreadCountPatchAction,
  getFavouritesCountRefreshAction,
  getInboxCountRefreshAction,
  getMessagesRefreshAction,
  getSentCountRefreshAction,
  getUnreadCountRefreshAction,
  increaseFavouritesCountPatchAction,
  increaseSentCountPatchAction,
  increaseSpamCountPatchAction,
  increaseTrashCountPatchAction,
  increaseUnreadCountPatchAction,
  setInProgressAction,
} from '@/store';
import { SplitPanels } from '@/components/SplitPanels';
import { MessagePreviewList } from '@/features/MessagePreviewList';
import {
  MessageControllerGetMessagesApiArg,
  MessageDto,
  MessagePreferencesDto,
  useMessageControllerManagePreferencesMutation,
} from '@/store/api/message-api';
import { useEffect, useState } from 'react';
import { Scrollable } from '@/components/Scrollable';
import { notification } from 'antd';
import { NotificationConfig } from '@/configs';
import { PagePrimaryProps } from '@/features/PagePrimary/types';
import { getListPatchAction } from '@/features/PagePrimary/utils';

export const PagePrimary = ({
  user,
  listSpecificReqArgs,
  threadSpecificReqArgs,
  headerElement,
  filterRenderElement,
  onRefresh,
  onReply,
}: PagePrimaryProps) => {
  const [listCachedArgs, setListCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [threadCachedArgs, setThreadCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [openedMessage, setOpenedMessage] = useState<MessageDto>();
  const [managePreferences] = useMessageControllerManagePreferencesMutation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => () => closeMessage(), []);

  const closeMessage = () => {
    setOpenedMessage(null);
    setThreadCachedArgs(undefined);
  };

  const handleReply = (message: MessageDto) => {
    dispatch(increaseSentCountPatchAction(user.email));
    onReply(message, listCachedArgs);
  };

  const updatePreferences = async ({ messageId, sender, recipient }: MessageDto, prefs: MessagePreferencesDto) => {
    const { isRead, isFavourite, isSpam, isTrash } = prefs;
    try {
      dispatch(setInProgressAction(true));
      await managePreferences({ body: [{ messageId, preferences: prefs }] }).unwrap();

      dispatch(getListPatchAction(messageId, prefs, listCachedArgs));
      threadCachedArgs && dispatch(getListPatchAction(messageId, prefs, threadCachedArgs));

      if (isRead != null) {
        if (recipient.email === user.email) {
          dispatch(isRead ? decreaseUnreadCountPatchAction(user.email) : increaseUnreadCountPatchAction(user.email));
        }
      }

      if (isFavourite != null) {
        dispatch(isFavourite ? increaseFavouritesCountPatchAction() : decreaseFavouritesCountPatchAction());
      }

      if (isSpam != null) {
        dispatch(increaseSpamCountPatchAction());

        if (sender.email === user.email) {
          dispatch(decreaseSentCountPatchAction(user.email));
        }

        if (recipient.email === user.email) {
          dispatch(decreaseInboxCountPatchAction(user.email));
          dispatch(getUnreadCountRefreshAction(user.email));
        }
      }

      if (isTrash != null) {
        dispatch(increaseTrashCountPatchAction());

        if (sender.email === user.email) {
          dispatch(decreaseSentCountPatchAction(user.email));
        }

        if (recipient.email === user.email) {
          dispatch(decreaseInboxCountPatchAction(user.email));
          dispatch(getUnreadCountRefreshAction(user.email));
        }
      }
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    } finally {
      dispatch(setInProgressAction(false));
    }
  };

  const batchTrash = async (messageIds: number[]) => {
    try {
      dispatch(setInProgressAction(true));

      await managePreferences({ body: messageIds.map(messageId => ({ messageId, preferences: { isTrash: true } })) }).unwrap();
      closeMessage();
      dispatch(increaseTrashCountPatchAction(messageIds.length));
      dispatch(getUnreadCountRefreshAction(user.email));
      dispatch(getInboxCountRefreshAction(user.email));
      dispatch(getSentCountRefreshAction(user.email));
      dispatch(getFavouritesCountRefreshAction());

      await dispatch(getMessagesRefreshAction(listCachedArgs));
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    } finally {
      dispatch(setInProgressAction(false));
    }
  };

  return (
    <SplitPanels
      leftElement={
        <>
          {headerElement}

          <Scrollable maxHeight="calc(100vh - 12.875rem)">
            <MessagePreviewList
              specificReqArgs={listSpecificReqArgs}
              openedMessage={openedMessage}
              onOpen={message => setOpenedMessage(message)}
              onCachedApiArgs={setListCachedArgs}
              onManagePreferences={updatePreferences}
              onRefresh={onRefresh}
              renderFilterElement={filterRenderElement}
            />
          </Scrollable>
        </>
      }
      rightElement={
        openedMessage ? (
          <Thread
            specificReqArgs={threadSpecificReqArgs}
            openedMessage={openedMessage}
            onClose={closeMessage}
            onCachedApiArgs={setThreadCachedArgs}
            onManagePreferences={updatePreferences}
            replyIsDisplayed
            onReply={handleReply}
            onBatchTrash={batchTrash}
          />
        ) : null
      }
    />
  );
};
