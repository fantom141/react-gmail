import { Thread } from '@/features/Thread';
import { useDispatch, useSelector } from 'react-redux';
import { openMessageAction, openedMessageSelector, closeMessageAction, AppDispatch } from '@/store';
import { SplitPanels } from '@/components/SplitPanels';
import { MessagePreviewList } from '@/features/MessagePreviewList';
import {
  enhancedApi as messageApi,
  MessageControllerGetMessagesApiArg,
  MessagePreferencesDto,
  useMessageControllerManagePreferencesMutation,
} from '@/store/api/message-api';
import { useContext, useEffect, useState } from 'react';
import { Header } from './Header';
import { Filter } from './Filter';
import { AuthContext } from '@/context/AuthContext';

export const InboxPage = () => {
  const { user } = useContext(AuthContext);
  const [listCachedArgs, setListCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [threadCachedArgs, setThreadCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [managePreferences] = useMessageControllerManagePreferencesMutation();
  const dispatch = useDispatch<AppDispatch>();
  const openedMessage = useSelector(openedMessageSelector);

  const closeMessage = () => {
    dispatch(closeMessageAction());
    setThreadCachedArgs(undefined);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => closeMessage(), []);

  const updatePreferences = async (messageId: number, prefs: MessagePreferencesDto) => {
    const updateByArgs = (args: MessageControllerGetMessagesApiArg) => {
      dispatch(
        messageApi.util.updateQueryData('messageControllerGetMessages', args, draft => {
          draft.content = draft.content.map(el => {
            if (el.messageId === messageId) {
              return { ...el, ...prefs };
            }

            return el;
          });
        })
      );
    };

    try {
      await managePreferences({ messageId, messagePreferencesDto: prefs }).unwrap();
      if (listCachedArgs) {
        updateByArgs(listCachedArgs);
      }

      if (threadCachedArgs) {
        updateByArgs(threadCachedArgs);
      }
    } catch (e) {}
  };

  return (
    <SplitPanels
      autoSaveId="inbox"
      left={
        <>
          <Header />

          <MessagePreviewList
            specificReqArgs={{ recipientEmail: user.email }}
            openedMessage={openedMessage}
            open={message => dispatch(openMessageAction(message))}
            emitCachedApiArgs={setListCachedArgs}
            managePreferences={updatePreferences}
            renderFilterElement={change => <Filter change={change} />}
          />
        </>
      }
      right={
        openedMessage ? (
          <Thread
            specificReqArgs={{ isSpam: false, isTrash: false }}
            openedMessage={openedMessage}
            close={closeMessage}
            emitCachedApiArgs={setThreadCachedArgs}
            managePreferences={updatePreferences}
          />
        ) : null
      }
    />
  );
};
