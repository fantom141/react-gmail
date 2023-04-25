import { DraftPreviewActionsProps } from './types';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMemo, useRef } from 'react';
import { MessageActionsWrapper, MessageActionsWrapperRef } from '@/features/MessageActions';

export const DraftPreviewActions = ({ isDisplayed, onDelete, className, ...rest }: DraftPreviewActionsProps) => {
  const wrapperRef = useRef<MessageActionsWrapperRef>();
  const classNames = useMemo(() => wrapperRef?.current?.getItemClassNames(isDisplayed) || '', [isDisplayed, wrapperRef?.current]);

  return (
    <MessageActionsWrapper
      {...rest}
      ref={wrapperRef}
    >
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
