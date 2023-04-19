import { ItemType } from 'antd/es/menu/hooks/useItems';
import { InboxLabel } from './InboxLabel';
import { AppRoutePath } from '@/configs';
import { InboxIcon } from './InboxIcon';

export const inboxItem = (collapsed: boolean): ItemType => ({
  label: <InboxLabel path={AppRoutePath.INBOX} />,
  key: AppRoutePath.INBOX,
  icon: <InboxIcon collapsed={collapsed} />,
  title: null,
});
