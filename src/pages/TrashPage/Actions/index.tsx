import { useMemo, useRef } from 'react';
import { MessageActionsWrapper, MessageActionsWrapperRef } from '@/features/MessageActions';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, InboxOutlined, MailOutlined, RollbackOutlined } from '@ant-design/icons';
import { ActionsProps } from './types';

export const Actions = ({ isRead, isDisplayed, onManagePreferences, onDelete, ...rest }: ActionsProps) => {
  const wrapperRef = useRef<MessageActionsWrapperRef>();
  const classNames = useMemo(() => wrapperRef?.current?.getItemClassNames(isDisplayed) || '', [isDisplayed, wrapperRef?.current]);

  const toReadIcon = (
    <Tooltip
      title="Mark as read"
      placement="bottom"
    >
      <InboxOutlined />
    </Tooltip>
  );

  const toUnreadIcon = (
    <Tooltip
      title="Mark as unread"
      placement="bottom"
    >
      <MailOutlined />
    </Tooltip>
  );

  const toRestoreFromTrashIcon = (
    <Tooltip
      title="Restore"
      placement="bottom"
    >
      <RollbackOutlined />
    </Tooltip>
  );

  return (
    <MessageActionsWrapper
      {...rest}
      ref={wrapperRef}
    >
      <Button
        type="text"
        size="small"
        icon={isRead ? toUnreadIcon : toReadIcon}
        className={classNames}
        onClick={() => onManagePreferences({ isRead: !isRead })}
      ></Button>

      <Button
        type="text"
        size="small"
        icon={toRestoreFromTrashIcon}
        className={classNames}
        onClick={() => onManagePreferences({ isTrash: false })}
      ></Button>

      <Button
        type="text"
        size="small"
        icon={
          <Tooltip
            title="Delete"
            placement="bottom"
          >
            <DeleteOutlined />
          </Tooltip>
        }
        className={classNames}
        onClick={onDelete}
      ></Button>
    </MessageActionsWrapper>
  );
};
