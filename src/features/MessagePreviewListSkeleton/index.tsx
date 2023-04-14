import styles from './styles.module.scss';
import { useMemo } from 'react';
import { ContentBlock } from '@/components/ContentBlock';
import { List, Skeleton } from 'antd';
import { MessagePreviewListSkeletonProps } from './types';

export const MessagePreviewListSkeleton = ({ itemsCount = 3 }: MessagePreviewListSkeletonProps) => {
  const source = useMemo(() => new Array(itemsCount).fill({}), [itemsCount]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={source}
      renderItem={() => (
        <ContentBlock
          className={styles.content}
          borderRadius
        >
          <Skeleton
            active
            paragraph={{ rows: 2, width: [120, '100%'] }}
            className={styles.skeleton}
          />
        </ContentBlock>
      )}
    ></List>
  );
};
