import { ItemType } from 'antd/es/menu/hooks/useItems';
import { TrashLabel } from './TrashLabel';
import { appRoutePath } from '@/utils';
import { DeleteOutlined } from '@ant-design/icons';

export const trashItem: ItemType = {
  label: <TrashLabel path={appRoutePath.TRASH} />,
  key: appRoutePath.TRASH,
  icon: <DeleteOutlined />,
  title: null,
};
