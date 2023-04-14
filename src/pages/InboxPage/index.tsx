import { Thread } from '@/features/Thread';
import { useDispatch, useSelector } from 'react-redux';
import { openMessageAction, openedMessageSelector, closeMessageAction, AppDispatch } from '@/store';
import { SplitPanels } from '@/components/SplitPanels';
import { LeftPanel } from './LeftPanel';
import {
  enhancedApi as messageApi,
  MessageControllerGetMessagesApiArg,
  MessagePreferencesDto,
  useMessageControllerManagePreferencesMutation,
} from '@/store/api/message-api';
import { useState } from 'react';

export const InboxPage = () => {
  const [listCachedArgs, setListCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [threadCachedArgs, setThreadCachedArgs] = useState<MessageControllerGetMessagesApiArg>();
  const [managePreferences] = useMessageControllerManagePreferencesMutation();
  const dispatch = useDispatch<AppDispatch>();
  const openedMessage = useSelector(openedMessageSelector);

  const closeMessage = () => {
    dispatch(closeMessageAction());
    setThreadCachedArgs(undefined);
  };

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
        <LeftPanel
          openedMessage={openedMessage}
          open={message => dispatch(openMessageAction(message))}
          emitCachedApiArgs={setListCachedArgs}
          managePreferences={updatePreferences}
        />
      }
      right={
        openedMessage ? (
          <Thread
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
