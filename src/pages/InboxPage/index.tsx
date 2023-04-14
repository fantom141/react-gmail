import { Thread } from '@/features/Thread';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage, openedMessageSelector, openMessage } from '@/store';
import { SplitPanels } from '@/components/SplitPanels';
import { LeftPanel } from './LeftPanel';

export const InboxPage = () => {
  const dispatch = useDispatch();
  const openedMessage = useSelector(openedMessageSelector);

  return (
    <SplitPanels
      autoSaveId="inbox"
      left={
        <LeftPanel
          openedMessage={openedMessage}
          open={message => dispatch(openMessage(message))}
        />
      }
      right={
        openedMessage ? (
          <Thread
            openedMessage={openedMessage}
            close={() => dispatch(closeMessage())}
          />
        ) : null
      }
    />
  );
};
