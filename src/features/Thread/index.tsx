import { ThreadHeader } from './ThreadHeader';
import { ThreadProps } from './types';
import { useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { List } from 'antd';
import { useEffect } from 'react';
import { getDefaultFilterParams } from './utils';
import { MessageDetails } from '@/features/MessageDetails';
import { MessageDetailsListSkeleton } from '@/features/MessageDetailsListSkeleton';

export const Thread = ({ openedMessage, close }: ThreadProps) => {
  const [getMessages, { data: messagesRes, isFetching }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(getDefaultFilterParams(openedMessage.threadId));
  }, [getMessages, openedMessage.threadId]);

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
            />
          )}
        ></List>
      )}
    </>
  );
};
