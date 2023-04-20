import styles from './styles.module.scss';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Logout } from '../Logout';
import { UserInfoProps } from './types';
import { ColorSchemeSwitcher } from '@/features/ColorSchemeSwitcher';

const { Title, Text } = Typography;

export const UserInfo = ({ collapsed }: UserInfoProps) => {
  const { user } = useContext(AuthContext);

  if (collapsed) {
    return <Logout />;
  }

  return (
    <div className={styles.root}>
      <Avatar
        size="large"
        icon={<UserOutlined />}
      />

      <Space
        direction="vertical"
        size={0}
        className={styles.info}
      >
        <Title
          level={5}
          ellipsis
          className={styles.title}
        >
          {user?.displayName || 'No display name'}
        </Title>

        <Text type="secondary">{user?.email}</Text>
      </Space>

      <ColorSchemeSwitcher />

      <Logout />
    </div>
  );
};
