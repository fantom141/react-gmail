import { Header } from '../Header';
import { Filter } from '../Filter';
import { MessageListActions } from '@/components/MessageListActions';
import { MessageList } from '../MessageList';
import { LeftPanelProps } from './types';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { getDefaultFilterParams } from './utils';

export const LeftPanel = ({ openedMessage, open }: LeftPanelProps) => {
  const { user } = useContext(AuthContext);
  const defaultFilterParams = useMemo(() => getDefaultFilterParams(user.email), [user.email]);

  const [getMessages, { data: messagesRes, isFetching, originalArgs }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(defaultFilterParams);
  }, [getMessages, defaultFilterParams]);

  return (
    <>
      <Header />

      <Filter change={v => getMessages({ ...defaultFilterParams, ...originalArgs, page: 0, ...v })} />

      {messagesRes && (
        <MessageListActions
          totalEntries={messagesRes.totalElements}
          currentPage={messagesRes.page}
          pageSize={messagesRes.size}
          sort={messagesRes.sort}
          paginate={(page, size) => getMessages({ ...originalArgs, page, size })}
          changeSort={val => getMessages({ ...originalArgs, sort: val })}
          refresh={() => getMessages(originalArgs)}
        />
      )}

      <MessageList
        isFetching={isFetching}
        dataSource={messagesRes?.content}
        openedMessageId={openedMessage?.messageId}
        open={message => open(message)}
      />
    </>
  );
};
