import styles from './styles.module.scss';
import { ContentBlock } from '@/components/ContentBlock';
import { theme, Tooltip, Typography } from 'antd';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { CaretDownOutlined } from '@ant-design/icons';
import { PreviewProps } from './types';
import { getUserFullName } from '@/utils';

const { Title, Text } = Typography;
const { useToken } = theme;

export const Preview = ({
  subject,
  content,
  createdAt,
  firstName,
  lastName,
  email,
  isOpened,
  renderActionsElement,
  className,
  ...restProps
}: PreviewProps) => {
  const [cursorOver, setCursorOver] = useState(false);

  const {
    token: { colorTextQuaternary: noTextColor },
  } = useToken();

  const date = useMemo(() => dayjs(createdAt).format('MMM DD'), [createdAt]);
  const fullName = useMemo(() => (firstName && lastName ? getUserFullName({ firstName, lastName }) : ''), [firstName, lastName]);

  const rootClassNames = classnames(
    styles.root,
    {
      [styles.opened]: isOpened,
    },
    className
  );

  return (
    <ContentBlock
      {...restProps}
      borderRadius
      className={rootClassNames}
      onMouseOver={() => setCursorOver(true)}
      onMouseOut={() => setCursorOver(false)}
    >
      <div className={styles.wrapper}>
        <Title
          level={5}
          ellipsis
          className={styles.subject}
          style={{ color: !subject ? `${noTextColor}` : '' }}
        >
          {subject || 'No Subject'}
        </Title>

        <span className={styles.dateAndActions}>
          <div className={styles.actions}>{renderActionsElement(cursorOver)}</div>

          <Text className={styles.date}>{date}</Text>
        </span>

        <div className={styles.fullName}>
          <Text
            className={styles.fullNameText}
            style={{ color: !fullName ? `${noTextColor}` : '' }}
          >
            {fullName || 'No Full Name'}
          </Text>

          {email && (
            <Tooltip
              title={email}
              placement="bottom"
            >
              <CaretDownOutlined className={styles.fullNameChevron} />
            </Tooltip>
          )}
        </div>

        <Text
          className={content}
          ellipsis
          type="secondary"
          style={{ color: !content ? `${noTextColor}` : '' }}
        >
          {content || 'No Content'}
        </Text>
      </div>
    </ContentBlock>
  );
};
