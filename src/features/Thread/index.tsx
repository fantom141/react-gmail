import { Header } from './Header';
import { ThreadProps } from './types';
import { useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { List } from 'antd';
import { useEffect } from 'react';
import { getPredefinedReqArgs } from './utils';
import { MessageDetails } from '@/features/MessageDetails';
import { MessageDetailsListSkeleton } from '@/features/MessageDetailsListSkeleton';
import { MessageActions } from '@/features/MessageActions';

export const Thread = ({ specificReqArgs, openedMessage, onClose, onManagePreferences, onCachedApiArgs }: ThreadProps) => {
  const [getMessages, { data: messagesRes, isFetching, originalArgs }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(getPredefinedReqArgs(openedMessage.threadId, specificReqArgs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedMessage.threadId]);

  useEffect(() => {
    onCachedApiArgs(originalArgs);
  }, [onCachedApiArgs, originalArgs]);

  return (
    <>
      <Header onClose={onClose} />

      {isFetching || !messagesRes ? (
        <MessageDetailsListSkeleton />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={messagesRes.content}
          renderItem={item => (
            <MessageDetails
              data={item}
              isOpened={item.messageId === openedMessage.messageId}
              renderActionsElement={
                <MessageActions
                  isRead={item.isRead}
                  isFavourite={item.isFavourite}
                  isSpam={item.isSpam}
                  isTrash={item.isTrash}
                  isDisplayed
                  onManagePreferences={prefs => onManagePreferences(item.messageId, prefs)}
                />
              }
            />
          )}
        ></List>
      )}
    </>
  );
};
