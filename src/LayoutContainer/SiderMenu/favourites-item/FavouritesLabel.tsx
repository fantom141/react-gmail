import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../types';
import { getFavouritesCountQueryArgs } from '@/store';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';

export const FavouritesLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getFavouritesCountQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Favourites"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
