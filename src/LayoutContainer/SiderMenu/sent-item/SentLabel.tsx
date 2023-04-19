import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../types';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getSentCountQueryArgs } from '@/store';

export const SentLabel = ({ path }: SiderMenuLabelProps) => {
  const { user } = useContext(AuthContext);
  const { data: totalCount } = useMessageControllerGetCountQuery(getSentCountQueryArgs(user.email));

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Sent"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
