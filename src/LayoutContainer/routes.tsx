import { Navigate, Route, Routes } from 'react-router-dom';
import { InboxPage } from '@/pages/InboxPage';
import { SentPage } from '@/pages/SentPage';
import { AppRoutePath } from '@/configs';
import { DraftsPage } from '@/pages/DraftsPage';
import { FavouritesPage } from '@/pages/FavouritesPage';
import { SpamPage } from '@/pages/SpamPage';
import { TrashPage } from '@/pages/TrashPage';

export const LayoutRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Navigate
            to={AppRoutePath.INBOX}
            replace
          />
        }
      />
      <Route
        path={AppRoutePath.INBOX}
        element={<InboxPage />}
      />
      <Route
        path={AppRoutePath.SENT}
        element={<SentPage />}
      />
      <Route
        path={AppRoutePath.DRAFTS}
        element={<DraftsPage />}
      />
      <Route
        path={AppRoutePath.FAVOURITES}
        element={<FavouritesPage />}
      />
      <Route
        path={AppRoutePath.SPAM}
        element={<SpamPage />}
      />
      <Route
        path={AppRoutePath.TRASH}
        element={<TrashPage />}
      />
      <Route
        path="*"
        element={<Page404 />}
      />
    </Routes>
  );
};
