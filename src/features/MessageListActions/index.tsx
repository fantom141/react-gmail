import styles from './styles.module.scss';
import { Button, Pagination, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { ContentBlock } from '@/components/ContentBlock';
import { MessageListActionsProps, SortDirs } from './types';
import { useMemo } from 'react';
import { expandSort, prepareToChangeSort } from './untils';
import { IconSortDown, IconSortUp } from '@/components/Icon';

export const MessageListActions = ({
  totalEntries,
  currentPage,
  pageSize,
  sort,
  onPaginate,
  onChangeSort,
  onRefresh,
}: MessageListActionsProps) => {
  const sortDir: SortDirs = useMemo(() => expandSort(sort).dir, [sort]);

  return (
    <ContentBlock
      className={styles.root}
      transparent
    >
      <Tooltip
        title="Refresh"
        placement="bottom"
        className={styles.refresh}
      >
        <Button
          type="text"
          size="small"
          icon={<RedoOutlined />}
          onClick={onRefresh}
        />
      </Tooltip>

      <Tooltip
        title={`Date received ${sortDir}`}
        placement="bottom"
      >
        <Button
          type="text"
          size="small"
          icon={sortDir === SortDirs.ASC ? <IconSortUp /> : <IconSortDown />}
          onClick={() => onChangeSort(prepareToChangeSort(sort))}
        />
      </Tooltip>

      <Pagination
        size="small"
        total={totalEntries}
        current={currentPage + 1}
        pageSize={pageSize}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        className={styles.paginator}
        onChange={(page, pageSize) => onPaginate(page - 1, pageSize)}
      />
    </ContentBlock>
  );
};
