import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getInboxCountStoreQueryArgs, getUnreadCountStoreQueryArgs } from '@/utils';
import { PageHeader } from '@/components/PageHeader';

export const Header = () => {
  const { user } = useContext(AuthContext);

  const { data: totalCount } = useMessageControllerGetCountQuery(getInboxCountStoreQueryArgs(user.email));
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountStoreQueryArgs(user.email));

  return (
    <PageHeader
      title="Inbox"
      totalCount={totalCount}
      extraInfo={!!unreadCount ? `${unreadCount} Unread` : null}
    />
  );
};
