import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../SiderMenu.types';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getSentCountStoreQueryArgs } from '@/utils';

export const SentLabel = ({ path }: SiderMenuLabelProps) => {
  const { user } = useContext(AuthContext);
  const { data: totalCount } = useMessageControllerGetCountQuery(getSentCountStoreQueryArgs(user.email));

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Sent"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
