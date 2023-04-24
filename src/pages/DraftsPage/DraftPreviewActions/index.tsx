import { DraftPreviewActionsProps } from './types';
import classnames from 'classnames';
import styles from '@/features/MessageActions/styles.module.scss';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const DraftPreviewActions = ({ isDisplayed, onDelete, className, ...rest }: DraftPreviewActionsProps) => {
  const classNames = classnames(
    styles.item,
    {
      [styles.itemIsDisplayed]: isDisplayed,
    },
    className
  );

  return (
    <Button
      {...rest}
      type="text"
      size="small"
      className={classNames}
      icon={
        <Tooltip
          title="Delete"
          placement="bottom"
        >
          <DeleteOutlined />
        </Tooltip>
      }
      onClick={e => {
        e.stopPropagation();
        onDelete();
      }}
    />
  );
};
