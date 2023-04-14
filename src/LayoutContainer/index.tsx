import styles from './styles.module.scss';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { LayoutRoutes } from './routes';
import { LayoutSider } from './LayoutSider';
import { ComposeEmail } from '@/features/ComposeEmail';
import { AuthTokenInitializer } from './AuthTokenInitializer';

const { Content } = Layout;

export const LayoutContainer = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [composeEmailOpened, setComposeEmailOpened] = useState(false);

  return (
    <AuthTokenInitializer>
      <Layout hasSider>
        <LayoutSider
          collapsed={siderCollapsed}
          collapsedChange={() => setSiderCollapsed(!siderCollapsed)}
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
