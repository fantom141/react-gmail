import { Navigate, Route, Routes } from 'react-router-dom';
import { InboxPage } from '@/pages/InboxPage';
import { SentPage } from '@/pages/SentPage';
import { appRoutePath } from '@/configs';
import { DraftsPage } from '@/pages/DraftstPage';
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
            to={appRoutePath.INBOX}
            replace
          />
        }
      />
      <Route
        path={appRoutePath.INBOX}
        element={<InboxPage />}
      />
      <Route
        path={appRoutePath.SENT}
        element={<SentPage />}
      />
      <Route
        path={appRoutePath.DRAFTS}
        element={<DraftsPage />}
      />
      <Route
        path={appRoutePath.FAVOURITES}
        element={<FavouritesPage />}
      />
      <Route
        path={appRoutePath.SPAM}
        element={<SpamPage />}
      />
      <Route
        path={appRoutePath.TRASH}
        element={<TrashPage />}
      />
    </Routes>
  );
};
