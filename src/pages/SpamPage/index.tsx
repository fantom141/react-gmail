import { Thread } from '@/features/Thread';
import { useDispatch } from 'react-redux';
import {
  AppDispatch,
  decreaseSpamCountPatchAction,
  getSpamCountRefreshAction,
  getUnreadCountRefreshAction,
  increaseInboxCountPatchAction,
  increaseSentCountPatchAction,
  increaseTrashCountPatchAction,
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
import { notification } from 'antd';
import { NotificationConfig } from '@/configs';
import { getListPatchAction } from '@/features/PagePrimary/utils';
import { Header } from './Header';
import { Filter } from './Filter';
import { Actions } from './Actions';
import { AuthContext } from '@/context/AuthContext';

export const SpamPage = () => {
  const { user } = useContext(AuthContext);

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

  const refreshCounts = () => {
    dispatch(getSpamCountRefreshAction());
  };

  const updatePreferences = async ({ messageId, sender, recipient }: MessageDto, prefs: MessagePreferencesDto) => {
    const { isSpam, isTrash } = prefs;
    try {
      dispatch(setInProgressAction(true));
      await managePreferences({ body: [{ messageId, preferences: prefs }] }).unwrap();

      dispatch(getListPatchAction(messageId, prefs, listCachedArgs));
      threadCachedArgs && dispatch(getListPatchAction(messageId, prefs, threadCachedArgs));

      if (isSpam != null) {
        dispatch(decreaseSpamCountPatchAction());

        if (sender.email === user.email) {
          dispatch(increaseSentCountPatchAction(user.email));
        }

        if (recipient.email === user.email) {
          dispatch(increaseInboxCountPatchAction(user.email));
          dispatch(getUnreadCountRefreshAction(user.email));
        }

        if (openedMessage && openedMessage.messageId === messageId) {
          closeMessage();
        }
      }

      if (isTrash != null) {
        dispatch(increaseTrashCountPatchAction());
        dispatch(decreaseSpamCountPatchAction());
        closeMessage();
      }
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
          <Header />

          <MessagePreviewList
            specificReqArgs={{ isSpam: true, isTrash: false }}
            openedMessage={openedMessage}
            onOpen={message => setOpenedMessage(message)}
            onCachedApiArgs={setListCachedArgs}
            onManagePreferences={updatePreferences}
            onRefresh={refreshCounts}
            renderFilterElement={change => <Filter onChange={change} />}
            renderActionsElement={(item, cursorOver) => (
              <Actions
                isRead={item.isRead}
                isDisplayed={cursorOver}
                onManagePreferences={prefs => updatePreferences(item, prefs)}
              />
            )}
          />
        </>
      }
      rightElement={
        openedMessage ? (
          <Thread
            specificReqArgs={{ messageIds: [openedMessage.messageId] }}
            openedMessage={openedMessage}
            onClose={closeMessage}
            onCachedApiArgs={setThreadCachedArgs}
            onManagePreferences={updatePreferences}
            replyIsDisplayed={false}
            batchTrashIsDisplayed={false}
          />
        ) : null
      }
    />
  );
};
