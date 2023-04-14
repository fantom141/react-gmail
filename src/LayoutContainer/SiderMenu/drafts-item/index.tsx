import { EditOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { DraftsLabel } from './DraftsLabel';
import { appRoutePath } from '@/configs';

export const draftsItem: ItemType = {
  label: <DraftsLabel path={appRoutePath.DRAFTS} />,
  key: appRoutePath.DRAFTS,
  icon: <EditOutlined />,
  title: null,
};
