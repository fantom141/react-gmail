import styles from './styles.module.scss';
import { Header } from './Header';
import { ThreadProps } from './types';
import { MessageDto, useLazyMessageControllerGetMessagesQuery } from '@/store/api/message-api';
import { Button, List, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';
import { getPredefinedReqArgs, getReplyPatchAction, THREAD_LIST_ID } from './utils';
import { MessageDetails } from '@/features/MessageDetails';
import { MessageDetailsListSkeleton } from '@/features/MessageDetailsListSkeleton';
import { MessageActions } from '@/features/MessageActions';
import { Reply } from './Reply';
import { Scrollable, ScrollableRef } from '@/components/Scrollable';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { printService } from '@/services';
import { PrinterOutlined } from '@ant-design/icons';

export const Thread = ({
  specificReqArgs,
  openedMessage,
  replyIsDisplayed,
  batchTrashIsDisplayed,
  onClose,
  onManagePreferences,
  onCachedApiArgs,
  onReply,
  onBatchTrash,
}: ThreadProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollableRef = useRef<ScrollableRef>();
  const [getMessages, { data: messagesRes, isFetching, originalArgs, fulfilledTimeStamp }] = useLazyMessageControllerGetMessagesQuery();

  useEffect(() => {
    getMessages(getPredefinedReqArgs(openedMessage.threadId, specificReqArgs));
  }, [openedMessage.threadId]);

  useEffect(() => {
    onCachedApiArgs(originalArgs);
  }, [originalArgs]);

  useEffect(() => {
    if (fulfilledTimeStamp && openedMessage.threadId === originalArgs.threadId) {
      const el = scrollableRef.current.scrollByIdAttr(`${openedMessage.messageId}`);

      if (messagesRes.content.length > 1) {
        el.onanimationend = () => el.classList.remove(styles.opened);
        el.classList.add(styles.opened);
      }
    }
  }, [openedMessage.messageId, fulfilledTimeStamp]);

  const handleReply = (message: MessageDto) => {
    dispatch(getReplyPatchAction(message, originalArgs));
    scrollableRef.current.scrollBottom();
    onReply(message);
  };

  const print = (el: HTMLElement) => {
    printService.printContent(el);
  };

  const batchTrash = () => {
    const messageIds = messagesRes.content.map(({ messageId }) => messageId);
    onBatchTrash(messageIds);
  };

  return (
    <>
      <Header
        onClose={onClose}
        onPrint={() => print(document.getElementById(THREAD_LIST_ID))}
        onTrash={batchTrash}
        batchTrashIsDisplayed={batchTrashIsDisplayed}
      />

      {isFetching || !messagesRes ? (
        <MessageDetailsListSkeleton />
      ) : (
        <Scrollable
          maxHeight="calc(100vh - 5.5rem)"
          ref={scrollableRef}
        >
          <List
            itemLayout="horizontal"
            dataSource={messagesRes.content}
            id={THREAD_LIST_ID}
            renderItem={item => (
              <MessageDetails
                data={item}
                isOpened={item.messageId === openedMessage.messageId}
                renderActionsElement={
                  <>
                    <Tooltip
                      title="Print"
                      placement="bottom"
                    >
                      <Button
                        size="small"
                        type="text"
                        icon={<PrinterOutlined />}
                        className={styles.printMessage}
                        onClick={() => print(document.getElementById(`${item.messageId}`))}
                      />
                    </Tooltip>
                    <MessageActions
                      isRead={item.isRead}
                      isFavourite={item.isFavourite}
                      isSpam={item.isSpam}
                      isTrash={item.isTrash}
                      isDisplayed
                      onManagePreferences={prefs => onManagePreferences(item, prefs)}
                    />
                  </>
                }
              />
            )}
          />

          {replyIsDisplayed && (
            <Reply
              openedMessage={openedMessage}
              className={styles.reply}
              onMessageSent={handleReply}
            />
          )}
        </Scrollable>
      )}
    </>
  );
};
