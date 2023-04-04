import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../SiderMenu.types';
import { getDraftsCountStoreQueryArgs } from '@/utils';
import { useDraftControllerGetCountQuery } from '@/store/api/draft-api';

export const DraftsLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useDraftControllerGetCountQuery(getDraftsCountStoreQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Drafts"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
