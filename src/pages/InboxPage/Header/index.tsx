import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getInboxCountQueryArgs, getUnreadCountQueryArgs } from '@/store';
import { PageHeader } from '@/features/PageHeader';

export const Header = () => {
  const { user } = useContext(AuthContext);

  const { data: totalCount } = useMessageControllerGetCountQuery(getInboxCountQueryArgs(user.email));
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountQueryArgs(user.email));

  return (
    <PageHeader
      title="Inbox"
      totalCount={totalCount}
      extraInfo={!!unreadCount ? `${unreadCount} Unread` : null}
    />
  );
};
