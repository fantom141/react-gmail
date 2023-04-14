import { NavLink } from 'react-router-dom';
import { NavLinkContent } from '../NavLinkContent';
import { SiderMenuLabelProps } from '../types';
import { getSpamCountStoreQueryArgs } from '@/utils';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';

export const SpamLabel = ({ path }: SiderMenuLabelProps) => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getSpamCountStoreQueryArgs());

  return (
    <NavLink to={path}>
      <NavLinkContent
        title="Spam"
        totalCount={totalCount}
      />
    </NavLink>
  );
};
