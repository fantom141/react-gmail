import { ItemType } from 'antd/es/menu/hooks/useItems';
import { SpamLabel } from './SpamLabel';
import { appRoutePath } from '@/configs';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const spamItem: ItemType = {
  label: <SpamLabel path={appRoutePath.SPAM} />,
  key: appRoutePath.SPAM,
  icon: <ExclamationCircleOutlined />,
  title: null,
};
