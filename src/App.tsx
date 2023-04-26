import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { AuthContext, AuthContextProvider } from '@/context/AuthContext';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { User } from 'firebase/auth';
import { LayoutContainer } from './LayoutContainer';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AppLoading } from '@/components/AppLoading';
import { ThemeProvider } from '@/ThemeProvider';

const LoginPage = lazy(() => import('@/pages/LoginPage').then(module => ({ default: module.LoginPage })));

const ProtectedRoutes = ({ user }: PropsWithChildren<{ user: User }>) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AccessToAuthRoutes = ({ user }: PropsWithChildren<{ user: User }>) => {
  return user ? <Navigate to="/" /> : <Outlet />;
};

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthContextProvider>
          <AuthContext.Consumer>
            {({ user, loading }) =>
              loading ? (
                <AppLoading />
              ) : (
                <BrowserRouter>
                  <Routes>
                    <Route element={<ProtectedRoutes user={user} />}>
                      <Route
                        path="/*"
                        element={<LayoutContainer />}
                      />
                    </Route>
                    <Route element={<AccessToAuthRoutes user={user} />}>
                      <Route
                        path="/login"
                        element={
                          <Suspense>
                            <LoginPage />
                          </Suspense>
                        }
                      />
                    </Route>
                  </Routes>
                </BrowserRouter>
              )
            }
          </AuthContext.Consumer>
        </AuthContextProvider>
      </ThemeProvider>
    </Provider>
  );
}
