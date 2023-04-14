import { ItemType } from 'antd/es/menu/hooks/useItems';
import { InboxLabel } from './InboxLabel';
import { appRoutePath } from '@/configs';
import { InboxIcon } from './InboxIcon';

export const inboxItem = (collapsed: boolean): ItemType => ({
  label: <InboxLabel path={appRoutePath.INBOX} />,
  key: appRoutePath.INBOX,
  icon: <InboxIcon collapsed={collapsed} />,
  title: null,
});
