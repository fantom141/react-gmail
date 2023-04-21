import { Header } from './Header';
import { Filter } from './Filter';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { PagePrimary } from '@/features/PagePrimary';
import { AppDispatch, getMessagesRefreshAction, getSentCountRefreshAction } from '@/store';
import { useDispatch } from 'react-redux';
import { MessageControllerGetMessagesApiArg, MessageDto } from '@/store/api/message-api';

export const SentPage = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const refreshCounts = () => {
    dispatch(getSentCountRefreshAction(user.email));
  };

  const refreshList = (message: MessageDto, listCachedArgs: MessageControllerGetMessagesApiArg) => {
    dispatch(getMessagesRefreshAction(listCachedArgs));
  };

  return (
    <PagePrimary
      listSpecificReqArgs={{ senderEmail: user.email, isSpam: false, isTrash: false }}
      threadSpecificReqArgs={{ isSpam: false, isTrash: false }}
      user={user}
      headerElement={<Header />}
      filterRenderElement={change => <Filter onChange={change} />}
      onRefresh={refreshCounts}
      onMessageSent={refreshList}
    />
  );
};
