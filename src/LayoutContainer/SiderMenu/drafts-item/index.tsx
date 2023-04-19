import { EditOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { DraftsLabel } from './DraftsLabel';
import { AppRoutePath } from '@/configs';

export const draftsItem: ItemType = {
  label: <DraftsLabel path={AppRoutePath.DRAFTS} />,
  key: AppRoutePath.DRAFTS,
  icon: <EditOutlined />,
  title: null,
};
