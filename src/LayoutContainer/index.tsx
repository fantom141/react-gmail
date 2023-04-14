import styles from './styles.module.scss';
import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { LayoutRoutes } from './routes';
import { LayoutSider } from './LayoutSider';
import { ComposeEmail } from '@/features/ComposeEmail';
import { AuthTokenInitializer } from './AuthTokenInitializer';
import { localStorageService } from '@/services';
import { LocalStorageKeys } from '@/configs';

const { Content } = Layout;

export const LayoutContainer = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [composeEmailOpened, setComposeEmailOpened] = useState(false);

  useEffect(() => {
    const isCollapsed = Boolean(localStorageService.get(LocalStorageKeys.SIDER_IS_COLLAPSED));
    setSiderCollapsed(isCollapsed);
  }, []);

  const changeCollapsedState = (isCollapsed: boolean) => {
    setSiderCollapsed(isCollapsed);
    localStorageService.set(LocalStorageKeys.SIDER_IS_COLLAPSED, isCollapsed);
  };

  return (
    <AuthTokenInitializer>
      <Layout hasSider>
        <LayoutSider
          collapsed={siderCollapsed}
          collapsedChange={() => changeCollapsedState(!siderCollapsed)}
          compose={() => setComposeEmailOpened(true)}
        />

        <Layout className={siderCollapsed ? styles.collapsed : styles.expanded}>
          <Content className={styles.content}>
            <LayoutRoutes />
          </Content>

          {composeEmailOpened && (
            <ComposeEmail
              className={styles.composeEmail}
              close={() => setComposeEmailOpened(false)}
            />
          )}
        </Layout>
      </Layout>
    </AuthTokenInitializer>
  );
};
