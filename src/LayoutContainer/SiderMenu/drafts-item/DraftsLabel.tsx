import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../SiderMenu.types';
import { getDraftCountStoreQueryArgs } from '@/utils';
import { useDraftControllerGetCountQuery } from '@/store/api/draft-api';

export const DraftsLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useDraftControllerGetCountQuery(getDraftCountStoreQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Drafts"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
