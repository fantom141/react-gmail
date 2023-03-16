import { HTMLAttributes, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Avatar, Space, theme, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Logout } from './Logout';

const { Title, Text } = Typography;

const {
  defaultConfig: {
    token: { colorBgBase },
  },
} = theme;

interface Props extends HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
}

export const UserInfo = ({ collapsed }: Props) => {
  const { user } = useContext(AuthContext);

  if (collapsed) {
    return <Logout />;
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <Space>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{ backgroundColor: colorBgBase }}
        />

        <Space
          direction="vertical"
          size={0}
        >
          <Title
            level={5}
            style={{ marginBottom: 0 }}
            ellipsis
          >
            {user.displayName || 'No display name'}
          </Title>

          <Text type="secondary">{user.email}</Text>
        </Space>

        <Logout />
      </Space>
    </div>
  );
};
