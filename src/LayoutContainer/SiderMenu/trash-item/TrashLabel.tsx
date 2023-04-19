import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../types';
import { getTrashCountQueryArgs } from '@/store';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';

export const TrashLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getTrashCountQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Trash"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
