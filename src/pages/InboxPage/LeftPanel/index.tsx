import { Header } from '../Header';
import { Filter } from '../Filter';
import { MessageListActions } from '@/features/MessageListActions';
import { LeftPanelProps } from './types';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { getDefaultFilterParams } from './utils';
import { MessagePreviewListSkeleton } from '@/features/MessagePreviewListSkeleton';
import { MessageListEmpty } from '@/features/MessageListEmpty';
import { MessagePreview } from '@/features/MessagePreview';
import { List } from 'antd';
import { MessageActions } from '@/features/MessageActions';

export const LeftPanel = ({ openedMessage, open, managePreferences, emitCachedApiArgs }: LeftPanelProps) => {
  const { user } = useContext(AuthContext);
  const defaultFilterParams = useMemo(() => getDefaultFilterParams(user.email), [user.email]);

  const [getMessages, { data: messagesRes, isFetching, originalArgs }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(defaultFilterParams);
  }, [getMessages, defaultFilterParams]);

  useEffect(() => {
    emitCachedApiArgs(originalArgs);
  }, [emitCachedApiArgs, originalArgs]);

  return (
    <>
      <Header />

      <Filter change={v => getMessages({ ...defaultFilterParams, ...originalArgs, page: 0, ...v })} />

      {isFetching || !messagesRes?.content ? (
        <MessagePreviewListSkeleton />
      ) : (
        <>
          <MessageListActions
            totalEntries={messagesRes.totalElements}
            currentPage={messagesRes.page}
            pageSize={messagesRes.size}
            sort={messagesRes.sort}
            paginate={(page, size) => getMessages({ ...originalArgs, page, size })}
            changeSort={val => getMessages({ ...originalArgs, sort: val })}
            refresh={() => getMessages(originalArgs)}
          />

          {!messagesRes.content.length ? (
            <MessageListEmpty />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={messagesRes.content}
              renderItem={item => (
                <MessagePreview
                  data={item}
                  isOpened={item.messageId === openedMessage?.messageId}
                  onClick={() => open(item)}
                  actions={({ messageId, isRead, isFavourite, isTrash, isSpam }, cursorOver) => (
                    <MessageActions
                      isRead={isRead}
                      isFavourite={isFavourite}
                      isTrash={isTrash}
                      isSpam={isSpam}
                      isDisplayed={cursorOver}
                      managePreferences={prefs => managePreferences(messageId, prefs)}
                    />
                  )}
                />
              )}
            ></List>
          )}
        </>
      )}
    </>
  );
};
