import { useContext } from 'react';
import { Header } from './Header';
import { Filter } from './Filter';
import { AuthContext } from '@/context/AuthContext';
import { PagePrimary } from '@/features/PagePrimary';
import { AppDispatch, getInboxCountRefreshAction, getUnreadCountRefreshAction } from '@/store';
import { useDispatch } from 'react-redux';

export const InboxPage = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const refreshCounts = () => {
    dispatch(getInboxCountRefreshAction(user.email));
    dispatch(getUnreadCountRefreshAction(user.email));
  };

  return (
    <PagePrimary
      listSpecificReqArgs={{ recipientEmail: user.email, isSpam: false, isTrash: false }}
      threadSpecificReqArgs={{ isSpam: false, isTrash: false }}
      user={user}
      headerElement={<Header />}
      filterRenderElement={change => <Filter onChange={change} />}
      onRefresh={refreshCounts}
    />
  );
};
