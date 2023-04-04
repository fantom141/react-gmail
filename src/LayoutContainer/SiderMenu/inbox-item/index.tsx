import { MailOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { InboxLabel } from './InboxLabel';
import { appRoutePath } from '@/utils';

export const inboxItem: ItemType = {
  label: <InboxLabel path={appRoutePath.INBOX} />,
  key: appRoutePath.INBOX,
  icon: <MailOutlined />,
  title: null,
};
