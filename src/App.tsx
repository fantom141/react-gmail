import React, { PropsWithChildren } from 'react';
import { AuthContext, AuthContextProvider } from '@/context/AuthContext';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { User } from 'firebase/auth';
import { LayoutContainer } from './LayoutContainer';
import { LoginPage } from './pages/LoginPage';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AppLoading } from '@/components/AppLoading';

const ProtectedRoutes = ({ user }: PropsWithChildren<{ user: User }>) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AccessToAuthRoutes = ({ user }: PropsWithChildren<{ user: User }>) => {
  return user ? <Navigate to="/" /> : <Outlet />;
};

export function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            // seed tokens
            colorPrimary: '#0051fe',
            colorError: '#E1605F',
            fontFamily: 'LuxoraGrotesk, system-ui, sans-serif',

            // map tokens
            colorText: '#686D79', // for Title color set in index.css
            colorTextBase: '#686D79',
            colorIcon: '#686D79',
            colorBgContainer: '#fefefe',
            colorBgElevated: '#fefefe',
            colorBgLayout: '#fbfbfb',
            colorBorderSecondary: '#e9e9e9',
          },
          components: {
            Typography: {
              colorTextDescription: '#686D79A6',
            },
            Tooltip: {
              colorBgDefault: '#686D79',
              fontSize: 12,
              sizePopupArrow: 0,
            },
          },
        }}
        componentSize="large"
        input={{ autoComplete: 'off' }}
        form={{ requiredMark: false }}
      >
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
                        element={<LoginPage />}
                      />
                    </Route>
                  </Routes>
                </BrowserRouter>
              )
            }
          </AuthContext.Consumer>
        </AuthContextProvider>
      </ConfigProvider>
    </Provider>
  );
}
