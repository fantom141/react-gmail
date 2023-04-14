import { MessageDetailsListSkeletonProps } from './types';
import { useMemo } from 'react';
import { List, Skeleton } from 'antd';
import { ContentBlock } from '@/components/ContentBlock';
import styles from './styles.module.scss';

const { Input, Avatar } = Skeleton;

export const MessageDetailsListSkeleton = ({ itemsCount = 3 }: MessageDetailsListSkeletonProps) => {
  const source = useMemo(() => new Array(itemsCount).fill({}), [itemsCount]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={source}
      className={styles.root}
      renderItem={() => (
        <ContentBlock borderRadius>
          <div className={styles.header}>
            <Avatar
              active
              shape="circle"
              size={50}
              className={styles.avatar}
            />
            <Input
              active
              className={styles.name}
            />
            <Input
              active
              className={styles.date}
            />
            <Input
              active
              className={styles.info}
            />
            <Input
              active
              className={styles.actions}
            />
          </div>

          <Skeleton
            active
            title={{ width: '40%' }}
            paragraph={{ rows: 3, width: ['80%', '100%', '90%'] }}
            className={styles.skeleton}
          />
        </ContentBlock>
      )}
    ></List>
  );
};
