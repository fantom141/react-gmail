import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../SiderMenu.types';
import { getTrashCountStoreQueryArgs } from '@/utils';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';

export const TrashLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getTrashCountStoreQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Trash"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
