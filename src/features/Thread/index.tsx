import { ThreadHeader } from './ThreadHeader';
import { ThreadProps } from './types';
import { useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { List } from 'antd';
import { useEffect } from 'react';
import { getDefaultFilterParams } from './utils';
import { MessageDetails } from '@/features/MessageDetails';
import { MessageDetailsListSkeleton } from '@/features/MessageDetailsListSkeleton';
import { MessageActions } from '@/features/MessageActions';

export const Thread = ({ openedMessage, close, managePreferences, emitCachedApiArgs }: ThreadProps) => {
  const [getMessages, { data: messagesRes, isFetching, originalArgs }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(getDefaultFilterParams(openedMessage.threadId));
  }, [getMessages, openedMessage.threadId]);

  useEffect(() => {
    emitCachedApiArgs(originalArgs);
  }, [emitCachedApiArgs, originalArgs]);

  return (
    <>
      <ThreadHeader close={close} />

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
              actions={
                <MessageActions
                  isRead={item.isRead}
                  isFavourite={item.isFavourite}
                  isSpam={item.isSpam}
                  isTrash={item.isTrash}
                  isDisplayed
                  managePreferences={prefs => managePreferences(item.messageId, prefs)}
                />
              }
            />
          )}
        ></List>
      )}
    </>
  );
};
