import { MessagePreview } from '@/features/MessagePreview';
import { MessagePreviewListSkeleton } from '@/features/MessagePreviewListSkeleton';
import { MessageListEmpty } from '@/features/MessageListEmpty';
import { List } from 'antd';
import { MessageListProps } from './types';

export const MessageList = ({ isFetching, dataSource, open, openedMessageId }: MessageListProps) => {
  if (isFetching || !dataSource) {
    return <MessagePreviewListSkeleton />;
  }

  if (!dataSource.length) {
    return <MessageListEmpty />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={item => (
        <MessagePreview
          data={item}
          isOpened={item.messageId === openedMessageId}
          onClick={() => open(item)}
        />
      )}
    ></List>
  );
};
