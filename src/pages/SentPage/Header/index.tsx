import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getSentCountQueryArgs } from '@/store';
import { PageHeader } from '@/features/PageHeader';

export const Header = () => {
  const { user } = useContext(AuthContext);

  const { data: totalCount } = useMessageControllerGetCountQuery(getSentCountQueryArgs(user.email));

  return (
    <PageHeader
      title="Sent"
      totalCount={totalCount}
    />
  );
};
