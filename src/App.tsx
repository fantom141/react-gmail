import React, { PropsWithChildren } from 'react';
import { AuthContext, AuthContextProvider } from '@/context/AuthContext';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { User } from 'firebase/auth';
import { LayoutContainer } from './layout';
import { LoginPage } from './pages/LoginPage';
import { ConfigProvider, Row, Spin } from 'antd';

const ProtectedRoutes = ({ user }: PropsWithChildren<{ user: User }>) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AccessToAuthRoutes = ({ user }: PropsWithChildren<{ user: User }>) => {
  return user ? <Navigate to="/" /> : <Outlet />;
};

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // seed tokens
          colorPrimary: '#0051fe',
          colorError: '#E1605F',
          fontFamily: 'LuxoraGrotesk, system-ui, sans-serif',

          // map tokens
          colorText: '#686D79', // for Title color set in index.css
          colorIcon: '#686D79',
          colorBgContainer: '#fefefe',
          colorBgElevated: '#fefefe',
          colorBgLayout: '#fefefe',
          colorBorderSecondary: '#e9e9e9',
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
              <Row
                align="middle"
                justify="center"
                style={{ height: '100vh' }}
              >
                <Spin size="large"></Spin>
              </Row>
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
  );
}
