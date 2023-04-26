import { useMemo } from 'react';
import { getActionItemClassNames, MessageActionsWrapper } from '@/features/MessageActions';
import { Button, Tooltip } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, InboxOutlined, MailOutlined } from '@ant-design/icons';
import { ActionsProps } from '@/pages/SpamPage/Actions/types';

export const Actions = ({ isRead, isDisplayed, onManagePreferences, ...rest }: ActionsProps) => {
  const classNames = useMemo(() => getActionItemClassNames(isDisplayed) || '', [isDisplayed]);

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

  const toNotSpamIcon = (
    <Tooltip
      title="Not Spam"
      placement="bottom"
    >
      <CheckCircleOutlined />
    </Tooltip>
  );

  const toTrashIcon = (
    <Tooltip
      title="Trash"
      placement="bottom"
    >
      <DeleteOutlined />
    </Tooltip>
  );

  return (
    <MessageActionsWrapper {...rest}>
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
        icon={toNotSpamIcon}
        className={classNames}
        onClick={() => onManagePreferences({ isSpam: false })}
      ></Button>

      <Button
        type="text"
        size="small"
        icon={toTrashIcon}
        className={classNames}
        onClick={() => onManagePreferences({ isTrash: true })}
      ></Button>
    </MessageActionsWrapper>
  );
};
