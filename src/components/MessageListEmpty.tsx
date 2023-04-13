import { Empty } from 'antd';
import { ContentBlock } from '@/components/ContentBlock';

export const MessageListEmpty = () => {
  return (
    <ContentBlock>
      <Empty description="No Messages Found" />
    </ContentBlock>
  );
};
