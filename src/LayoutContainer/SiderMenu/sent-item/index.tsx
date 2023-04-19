import { SendOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { SentLabel } from './SentLabel';
import { AppRoutePath } from '@/configs';

export const sentItem: ItemType = {
  label: <SentLabel path={AppRoutePath.SENT} />,
  key: AppRoutePath.SENT,
  icon: <SendOutlined />,
  title: null,
};
