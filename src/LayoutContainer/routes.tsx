import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutePath } from '@/configs';
import { Page404 } from '@/pages/Page404';
import { lazy, Suspense } from 'react';
import { AppLoading } from '@/components/AppLoading';

const InboxPage = lazy(() => import('@/pages/InboxPage').then(module => ({ default: module.InboxPage })));
const SentPage = lazy(() => import('@/pages/SentPage').then(module => ({ default: module.SentPage })));
const DraftsPage = lazy(() => import('@/pages/DraftsPage').then(module => ({ default: module.DraftsPage })));
const FavouritesPage = lazy(() => import('@/pages/FavouritesPage').then(module => ({ default: module.FavouritesPage })));
const SpamPage = lazy(() => import('@/pages/SpamPage').then(module => ({ default: module.SpamPage })));
const TrashPage = lazy(() => import('@/pages/TrashPage').then(module => ({ default: module.TrashPage })));

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
        element={
          <Suspense fallback={<AppLoading />}>
            <InboxPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutePath.SENT}
        element={
          <Suspense fallback={<AppLoading />}>
            <SentPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutePath.DRAFTS}
        element={
          <Suspense fallback={<AppLoading />}>
            <DraftsPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutePath.FAVOURITES}
        element={
          <Suspense fallback={<AppLoading />}>
            <FavouritesPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutePath.SPAM}
        element={
          <Suspense fallback={<AppLoading />}>
            <SpamPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutePath.TRASH}
        element={
          <Suspense fallback={<AppLoading />}>
            <TrashPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={<Page404 />}
      />
    </Routes>
  );
};
