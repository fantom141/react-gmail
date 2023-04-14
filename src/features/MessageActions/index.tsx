import styles from './styles.module.scss';
import classnames from 'classnames';
import { Button, Space, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  MailOutlined,
  RollbackOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { MessageActionsProps } from './types';

export const MessageActions = ({ isRead, isFavourite, isSpam, isTrash, isDisplayed, managePreferences, ...rest }: MessageActionsProps) => {
  const classNames = classnames(styles.item, {
    [styles.itemIsDisplayed]: isDisplayed,
  });

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

  const toFavouriteIcon = (
    <Tooltip
      title="Mark as favourite"
      placement="bottom"
    >
      <StarOutlined />
    </Tooltip>
  );

  const toNotFavouriteIcon = (
    <Tooltip
      title="Unmark as favourite"
      placement="bottom"
    >
      <StarFilled style={{ color: '#F0CB78' }} />
    </Tooltip>
  );

  const toSpamIcon = (
    <Tooltip
      title="Spam"
      placement="bottom"
    >
      <ExclamationCircleOutlined />
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
      title="Delete"
      placement="bottom"
    >
      <DeleteOutlined />
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
    <Space
      {...rest}
      onClick={e => e.stopPropagation()}
      size={2}
    >
      <Button
        type="text"
        size="small"
        icon={isRead ? toUnreadIcon : toReadIcon}
        className={classNames}
        onClick={() => managePreferences({ isRead: !isRead })}
      ></Button>

      <Button
        type="text"
        size="small"
        icon={isSpam ? toNotSpamIcon : toSpamIcon}
        className={classNames}
        onClick={() => managePreferences({ isSpam: !isSpam })}
      ></Button>

      <Button
        type="text"
        size="small"
        icon={isTrash ? toRestoreFromTrashIcon : toTrashIcon}
        className={classNames}
        onClick={() => managePreferences({ isTrash: !isTrash })}
      ></Button>

      <Button
        type="text"
        size="small"
        icon={isFavourite ? toNotFavouriteIcon : toFavouriteIcon}
        className={`${classNames} ${isFavourite && styles.itemIsDisplayed}`}
        onClick={() => managePreferences({ isFavourite: !isFavourite })}
      ></Button>
    </Space>
  );
};
