import styles from './styles.module.scss';
import { HeaderProps } from './types';
import { Avatar, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getUserFullName } from '@/utils';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getAdditionalInfoValue } from './utils';
import { DotDivider } from '@/components/DotDivider';

const { Title, Text } = Typography;

export const Header = ({ message, actionsElement }: HeaderProps) => {
  const { user } = useContext(AuthContext);
  const { sender, recipient } = message;

  const senderFullName = useMemo(() => getUserFullName(sender), [sender]);
  const randomAvatarBg = useMemo(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`, []);
  const date = useMemo(() => dayjs(message.createdAt).format('ddd, MMM D, YYYY, HH:mm'), [message.createdAt]);
  const from = useMemo(() => getAdditionalInfoValue(sender.email, user.email), [sender.email, user.email]);
  const to = useMemo(() => getAdditionalInfoValue(recipient.email, user.email), [recipient.email, user.email]);

  return (
    <div className={styles.root}>
      <Avatar
        size="large"
        icon={<UserOutlined />}
        style={{ backgroundColor: randomAvatarBg }}
        className={styles.avatar}
      />

      <Title
        level={5}
        className={styles.fullName}
      >
        {senderFullName}
      </Title>

      <Text className={styles.date}>{date}</Text>

      <span className={styles.additionalInfo}>
        <Text type="secondary">From:</Text>
        <Text>{from}</Text>
        <DotDivider />
        <Text type="secondary">To:</Text>
        <Text>{to}</Text>
      </span>

      <div className={styles.actions}>{actionsElement}</div>
    </div>
  );
};
