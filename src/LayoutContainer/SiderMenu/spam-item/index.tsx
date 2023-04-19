import { ItemType } from 'antd/es/menu/hooks/useItems';
import { SpamLabel } from './SpamLabel';
import { AppRoutePath } from '@/configs';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const spamItem: ItemType = {
  label: <SpamLabel path={AppRoutePath.SPAM} />,
  key: AppRoutePath.SPAM,
  icon: <ExclamationCircleOutlined />,
  title: null,
};
