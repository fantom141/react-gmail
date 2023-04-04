import { Navigate, Route, Routes } from 'react-router-dom';
import { InboxPage } from '@/pages/InboxPage';
import { SentPage } from '@/pages/SentPage';

export const LayoutRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Navigate
            to="inbox"
            replace
          />
        }
      />
      <Route
        path="inbox"
        element={<InboxPage />}
      />
      <Route
        path="sent"
        element={<SentPage />}
      />
    </Routes>
  );
};
