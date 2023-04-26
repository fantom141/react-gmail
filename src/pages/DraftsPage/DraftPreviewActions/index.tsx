import { DraftPreviewActionsProps } from './types';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { getActionItemClassNames, MessageActionsWrapper } from '@/features/MessageActions';

export const DraftPreviewActions = ({ isDisplayed, onDelete, className, ...rest }: DraftPreviewActionsProps) => {
  const classNames = useMemo(() => getActionItemClassNames(isDisplayed) || '', [isDisplayed]);

  return (
    <MessageActionsWrapper {...rest}>
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
        onClick={() => onDelete()}
      />
    </MessageActionsWrapper>
  );
};
