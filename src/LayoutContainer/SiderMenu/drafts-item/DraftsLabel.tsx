import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../types';
import { getDraftsCountQueryArgs } from '@/store';
import { useDraftControllerGetCountQuery } from '@/store/api/draft-api';

export const DraftsLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useDraftControllerGetCountQuery(getDraftsCountQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Drafts"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
