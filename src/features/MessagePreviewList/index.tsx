import { MessageListActions } from '@/features/MessageListActions';
import { MessagePreviewListProps } from './types';
import { useEffect, useMemo } from 'react';
import { MessageControllerGetMessagesApiArg, useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { getPredefinedReqArgs } from './utils';
import { MessagePreviewListSkeleton } from '@/features/MessagePreviewListSkeleton';
import { MessageListEmpty } from '@/features/MessageListEmpty';
import { MessagePreview } from '@/features/MessagePreview';
import { List } from 'antd';
import { MessageActions } from '@/features/MessageActions';

export const MessagePreviewList = ({
  specificReqArgs,
  openedMessage,
  renderFilterElement,
  open,
  managePreferences,
  emitCachedApiArgs,
}: MessagePreviewListProps) => {
  const predefineReqArgs = useMemo(() => getPredefinedReqArgs(specificReqArgs), [specificReqArgs]);

  const [getMessages, { data: messagesRes, isFetching, originalArgs }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(predefineReqArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    emitCachedApiArgs(originalArgs);
  }, [emitCachedApiArgs, originalArgs]);

  const applyFilter = (values: MessageControllerGetMessagesApiArg) => {
    getMessages({ ...predefineReqArgs, ...originalArgs, page: 0, ...values });
  };

  return (
    <>
      {renderFilterElement(applyFilter)}

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
                  renderActions={({ messageId, isRead, isFavourite, isTrash, isSpam }, cursorOver) => (
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
