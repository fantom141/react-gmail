import styles from './styles.module.scss';
import { ContentBlock } from '@/components/ContentBlock';
import { theme, Tooltip, Typography } from 'antd';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { CaretDownOutlined } from '@ant-design/icons';
import { MessageActions } from '@/components/MessageActions';
import { MessagePreviewProps } from './types';

const { Title, Text } = Typography;
const { useToken } = theme;

export const MessagePreview = ({
  data: { subject, content, sender, createdAt, isRead, isFavourite, isSpam, isTrash },
  isOpened,
  ...restProps
}: MessagePreviewProps) => {
  const [cursorOver, setCursorOver] = useState(false);

  const {
    token: { colorTextQuaternary: noSubjectColor },
  } = useToken();

  const date = useMemo(() => dayjs(createdAt).format('MMM DD'), [createdAt]);
  const senderFullName = useMemo(() => `${sender.firstName} ${sender.lastName}`, [sender.firstName, sender.lastName]);

  const classNames = classnames(styles.root, {
    [styles.unread]: !isRead,
    [styles.opened]: isOpened,
  });

  return (
    <ContentBlock
      {...restProps}
      borderRadius
      className={classNames}
      onMouseOver={() => setCursorOver(true)}
      onMouseOut={() => setCursorOver(false)}
    >
      <div className={styles.wrapper}>
        <Title
          level={5}
          ellipsis
          className={styles.subject}
          style={{ color: !subject ? `${noSubjectColor}` : '' }}
        >
          {subject || 'No Subject'}
        </Title>

        <span className={styles.dateAndActions}>
          <MessageActions
            isRead={isRead}
            isFavourite={isFavourite}
            isTrash={isTrash}
            isSpam={isSpam}
            isDisplayed={cursorOver}
            className={styles.actions}
          />

          <Text className={styles.date}>{date}</Text>
        </span>

        <div className={styles.sender}>
          <Text className={styles.senderText}>{senderFullName}</Text>

          <Tooltip
            title={sender.email}
            placement="bottom"
          >
            <CaretDownOutlined className={styles.senderChevron} />
          </Tooltip>
        </div>

        <Text
          className={content}
          ellipsis
          type="secondary"
        >
          {content}
        </Text>
      </div>
    </ContentBlock>
  );
};
