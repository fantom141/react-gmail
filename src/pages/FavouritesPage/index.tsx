import { Header } from './Header';
import { Filter } from './Filter';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { PagePrimary } from '@/features/PagePrimary';
import { AppDispatch, getFavouritesCountRefreshAction, getMessagesRefreshAction } from '@/store';
import { useDispatch } from 'react-redux';
import { MessageControllerGetMessagesApiArg, MessagePreferencesDto } from '@/store/api/message-api';

export const FavouritesPage = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const refreshCounts = () => {
    dispatch(getFavouritesCountRefreshAction());
  };

  const refreshList = (prefs: MessagePreferencesDto, listCachedArgs: MessageControllerGetMessagesApiArg) => {
    if (prefs.isFavourite != null) {
      dispatch(getMessagesRefreshAction(listCachedArgs));
    }
  };

  return (
    <PagePrimary
      listSpecificReqArgs={{ isFavourite: true, isSpam: false, isTrash: false, sort: ['updatedAt,desc'] }}
      threadSpecificReqArgs={{ isSpam: false, isTrash: false }}
      user={user}
      headerElement={<Header />}
      filterRenderElement={change => <Filter onChange={change} />}
      onRefresh={refreshCounts}
      onPreferencesUpdate={refreshList}
    />
  );
};
