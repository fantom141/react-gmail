import styles from '../MessageActionsWrapper/styles.module.scss';
import { Button, Tooltip } from 'antd';
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
import { MessageActionsWrapper, MessageActionsWrapperRef } from '@/features/MessageActions';
import { useMemo, useRef } from 'react';

export const MessageActions = ({
  isRead,
  isFavourite,
  isSpam,
  isTrash,
  isDisplayed,
  onManagePreferences,
  ...rest
}: MessageActionsProps) => {
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
      title="Trash"
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

      {!isTrash && (
        <Button
          type="text"
          size="small"
          icon={isSpam ? toNotSpamIcon : toSpamIcon}
          className={classNames}
          onClick={() => onManagePreferences({ isSpam: !isSpam })}
        ></Button>
      )}

      <Button
        type="text"
        size="small"
        icon={isTrash ? toRestoreFromTrashIcon : toTrashIcon}
        className={classNames}
        onClick={() => onManagePreferences({ isTrash: !isTrash })}
      ></Button>

      {!isSpam && !isTrash && (
        <Button
          type="text"
          size="small"
          icon={isFavourite ? toNotFavouriteIcon : toFavouriteIcon}
          className={`${classNames} ${isFavourite && styles.itemIsDisplayed}`}
          onClick={() => onManagePreferences({ isFavourite: !isFavourite })}
        ></Button>
      )}
    </MessageActionsWrapper>
  );
};
