import { Thread } from '@/features/Thread';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  closeMessageAction,
  decreaseFavouritesCountPatchAction,
  decreaseUnreadCountPatchAction,
  getInboxCountRefreshAction,
  getUnreadCountRefreshAction,
  increaseFavouritesCountPatchAction,
  increaseSentCountPatchAction,
  increaseSpamCountPatchAction,
  increaseTrashCountPatchAction,
  increaseUnreadCountPatchAction,
  openedMessageSelector,
  openMessageAction,
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
import { useContext, useEffect, useState } from 'react';
import { Header } from './Header';
import { Filter } from './Filter';
import { AuthContext } from '@/context/AuthContext';
import { getInboxListPatchAction } from './utils';
import { Scrollable } from '@/components/Scrollable';
import { notification } from 'antd';
import { NotificationConfig } from '@/configs';

export const InboxPage = () => {
  const { user } = useContext(AuthContext);
  const [listCachedArgs, setListCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [threadCachedArgs, setThreadCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [managePreferences] = useMessageControllerManagePreferencesMutation();
  const dispatch = useDispatch<AppDispatch>();
  const openedMessage = useSelector(openedMessageSelector);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => closeMessage(), []);

  const closeMessage = () => {
    dispatch(closeMessageAction());
    setThreadCachedArgs(undefined);
  };

  const handleReply = (message: MessageDto) => {
    dispatch(increaseSentCountPatchAction(user.email));
  };

  const refreshCounts = () => {
    dispatch(getInboxCountRefreshAction(user.email));
    dispatch(getUnreadCountRefreshAction(user.email));
  };

  const updatePreferences = async (messageId: number, prefs: MessagePreferencesDto) => {
    const { isRead, isFavourite, isSpam, isTrash } = prefs;
    try {
      dispatch(setInProgressAction(true));
      await managePreferences({ messageId, messagePreferencesDto: prefs }).unwrap();

      dispatch(getInboxListPatchAction(messageId, prefs, listCachedArgs));
      threadCachedArgs && dispatch(getInboxListPatchAction(messageId, prefs, threadCachedArgs));

      if (isRead != null) {
        dispatch(isRead ? decreaseUnreadCountPatchAction(user.email) : increaseUnreadCountPatchAction(user.email));
      }

      if (isFavourite != null) {
        dispatch(isFavourite ? increaseFavouritesCountPatchAction() : decreaseFavouritesCountPatchAction());
      }

      if (isSpam != null) {
        dispatch(increaseSpamCountPatchAction());
      }

      if (isTrash != null) {
        dispatch(increaseTrashCountPatchAction());
      }
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    } finally {
      dispatch(setInProgressAction(false));
    }
  };

  return (
    <SplitPanels
      autoSaveId="inbox"
      leftElement={
        <Scrollable maxHeight="calc(100vh - 12.875rem)">
          <Header />

          <MessagePreviewList
            specificReqArgs={{ recipientEmail: user.email }}
            openedMessage={openedMessage}
            onOpen={message => dispatch(openMessageAction(message))}
            onCachedApiArgs={setListCachedArgs}
            onManagePreferences={updatePreferences}
            onRefresh={refreshCounts}
            renderFilterElement={change => <Filter onChange={change} />}
          />
        </Scrollable>
      }
      rightElement={
        openedMessage ? (
          <Thread
            specificReqArgs={{ isSpam: false, isTrash: false }}
            openedMessage={openedMessage}
            onClose={closeMessage}
            onCachedApiArgs={setThreadCachedArgs}
            onManagePreferences={updatePreferences}
            replyIsDisplayed
            onReply={handleReply}
          />
        ) : null
      }
    />
  );
};
