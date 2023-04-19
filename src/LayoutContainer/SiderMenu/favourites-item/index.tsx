import { StarOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { FavouritesLabel } from './FavouritesLabel';
import { AppRoutePath } from '@/configs';

export const favouritesItem: ItemType = {
  label: <FavouritesLabel path={AppRoutePath.FAVOURITES} />,
  key: AppRoutePath.FAVOURITES,
  icon: <StarOutlined />,
  title: null,
};
