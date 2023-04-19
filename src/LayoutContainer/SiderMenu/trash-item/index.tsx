import { ItemType } from 'antd/es/menu/hooks/useItems';
import { TrashLabel } from './TrashLabel';
import { AppRoutePath } from '@/configs';
import { DeleteOutlined } from '@ant-design/icons';

export const trashItem: ItemType = {
  label: <TrashLabel path={AppRoutePath.TRASH} />,
  key: AppRoutePath.TRASH,
  icon: <DeleteOutlined />,
  title: null,
};
