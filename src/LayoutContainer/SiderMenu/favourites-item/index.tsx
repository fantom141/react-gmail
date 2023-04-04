import { StarOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { FavouritesLabel } from './FavouritesLabel';
import { appRoutePath } from '@/utils';

export const favouritesItem: ItemType = {
  label: <FavouritesLabel path={appRoutePath.FAVOURITES} />,
  key: appRoutePath.FAVOURITES,
  icon: <StarOutlined />,
  title: null,
};
