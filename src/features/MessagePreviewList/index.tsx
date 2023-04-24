import { MessageListActions } from '@/features/MessageListActions';
import { MessagePreviewListProps } from './types';
import { useEffect, useMemo } from 'react';
import { MessageControllerGetMessagesApiArg, MessageDto, useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { getPredefinedReqArgs } from './utils';
import { MessagePreviewListSkeleton } from '@/features/MessagePreviewListSkeleton';
import { MessageListEmpty } from '@/features/MessageListEmpty';
import { MessagePreview } from '@/features/MessagePreview';
import { List } from 'antd';
import { MessageActions } from '@/features/MessageActions';
import { Scrollable } from '@/components/Scrollable';

export const MessagePreviewList = ({
  specificReqArgs,
  openedMessage,
  renderFilterElement,
  onOpen,
  onManagePreferences,
  onCachedApiArgs,
  onRefresh,
}: MessagePreviewListProps) => {
  const predefineReqArgs = useMemo(() => getPredefinedReqArgs(specificReqArgs), [specificReqArgs]);

  const [getMessages, { data: messagesRes, isFetching, originalArgs }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(predefineReqArgs);
  }, []);

  useEffect(() => {
    onCachedApiArgs(originalArgs);
  }, [onCachedApiArgs, originalArgs]);

  const applyFilter = (values: MessageControllerGetMessagesApiArg) => {
    getMessages({ ...predefineReqArgs, ...originalArgs, page: 0, ...values });
  };

  const refresh = () => {
    getMessages(originalArgs);
    onRefresh();
  };

  const openMessage = (message: MessageDto) => {
    onOpen(message);
    !message.isRead && onManagePreferences(message, { isRead: true });
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
            onPaginate={(page, size) => getMessages({ ...originalArgs, page, size })}
            onChangeSort={val => getMessages({ ...originalArgs, sort: val })}
            onRefresh={refresh}
          />

          {!messagesRes.content.length ? (
            <MessageListEmpty />
          ) : (
            <Scrollable maxHeight="calc(100vh - 12.875rem)">
              <List
                itemLayout="horizontal"
                dataSource={messagesRes.content}
                renderItem={item => (
                  <MessagePreview
                    data={item}
                    isOpened={item.messageId === openedMessage?.messageId}
                    onClick={() => openMessage(item)}
                    renderActionsElement={cursorOver => (
                      <MessageActions
                        isRead={item.isRead}
                        isFavourite={item.isFavourite}
                        isTrash={item.isTrash}
                        isSpam={item.isSpam}
                        isDisplayed={cursorOver}
                        onManagePreferences={prefs => onManagePreferences(item, prefs)}
                      />
                    )}
                  />
                )}
              ></List>
            </Scrollable>
          )}
        </>
      )}
    </>
  );
};
