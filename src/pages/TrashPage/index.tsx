import { Thread } from '@/features/Thread';
import { useDispatch } from 'react-redux';
import {
  AppDispatch,
  decreaseTrashCountPatchAction,
  getSpamCountRefreshAction,
  getTrashCountRefreshAction,
  increaseFavouritesCountPatchAction,
  increaseInboxCountPatchAction,
  increaseSentCountPatchAction,
  increaseSpamCountPatchAction,
  increaseUnreadCountPatchAction,
  setInProgressAction,
} from '@/store';
import { SplitPanels } from '@/components/SplitPanels';
import { MessagePreviewList } from '@/features/MessagePreviewList';
import {
  MessageControllerGetMessagesApiArg,
  MessageDto,
  MessagePreferencesDto,
  useMessageControllerDeleteMessageMutation,
  useMessageControllerManagePreferencesMutation,
} from '@/store/api/message-api';
import { useContext, useEffect, useState } from 'react';
import { Modal, notification, Typography } from 'antd';
import { NotificationConfig } from '@/configs';
import { getListPatchAction } from '@/features/PagePrimary/utils';
import { Header } from './Header';
import { Filter } from './Filter';
import { Actions } from './Actions';
import { AuthContext } from '@/context/AuthContext';

const { Text } = Typography;

export const TrashPage = () => {
  const { user } = useContext(AuthContext);

  const [listCachedArgs, setListCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [threadCachedArgs, setThreadCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [openedMessage, setOpenedMessage] = useState<MessageDto>();
  const [requestedForDeleteMessageId, setRequestedForDeleteMessageId] = useState<number>();
  const [managePreferences] = useMessageControllerManagePreferencesMutation();
  const [deleteMessage, { isLoading: deleting }] = useMessageControllerDeleteMessageMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => () => closeMessage(), []);

  const closeMessage = () => {
    setOpenedMessage(null);
    setThreadCachedArgs(undefined);
  };

  const refreshCounts = () => {
    dispatch(getTrashCountRefreshAction());
  };

  const updatePreferences = async (
    { isSpam, isFavourite, isRead, messageId, sender, recipient }: MessageDto,
    prefs: MessagePreferencesDto
  ) => {
    const { isTrash } = prefs;
    try {
      dispatch(setInProgressAction(true));
      await managePreferences({ body: [{ messageId, preferences: prefs }] }).unwrap();

      dispatch(getListPatchAction(messageId, prefs, listCachedArgs));
      threadCachedArgs && dispatch(getListPatchAction(messageId, prefs, threadCachedArgs));

      if (isTrash != null) {
        dispatch(decreaseTrashCountPatchAction());

        if (isSpam) {
          dispatch(increaseSpamCountPatchAction());
        } else if (isFavourite) {
          dispatch(increaseFavouritesCountPatchAction());
        }

        if (!isSpam) {
          if (sender.email === user.email) {
            dispatch(increaseSentCountPatchAction(user.email));
          }

          if (recipient.email === user.email) {
            dispatch(increaseInboxCountPatchAction(user.email));
            !isRead && dispatch(increaseUnreadCountPatchAction(user.email));
          }
        }

        if (openedMessage && messageId === openedMessage.messageId) {
          closeMessage();
        }
      }
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    } finally {
      dispatch(setInProgressAction(false));
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteMessage({ messageId: requestedForDeleteMessageId });
      notification.success({ message: NotificationConfig.message.DELETED, placement: NotificationConfig.placement });
      dispatch(decreaseTrashCountPatchAction());
      dispatch(getListPatchAction(requestedForDeleteMessageId, { isTrash: true }, listCachedArgs));
      setRequestedForDeleteMessageId(null);

      if (openedMessage && openedMessage.messageId === requestedForDeleteMessageId) {
        closeMessage();
      }
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  return (
    <>
      <SplitPanels
        leftElement={
          <>
            <Header />

            <MessagePreviewList
              specificReqArgs={{ isTrash: true }}
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
                  onDelete={() => setRequestedForDeleteMessageId(item.messageId)}
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

      <Modal
        title="Delete Message"
        open={!!requestedForDeleteMessageId}
        confirmLoading={deleting}
        closable={false}
        okText="Confirm"
        onOk={handleDeleteConfirmation}
        onCancel={() => setRequestedForDeleteMessageId(null)}
      >
        <Text>Are you sure to delete this message permanently?</Text>
      </Modal>
    </>
  );
};
