import { SendOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { SentLabel } from './SentLabel';
import { appRoutePath } from '@/utils';

export const sentItem: ItemType = {
  label: <SentLabel path={appRoutePath.SENT} />,
  key: appRoutePath.SENT,
  icon: <SendOutlined />,
  title: null,
};
