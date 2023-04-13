import styles from './LayoutContainer.module.scss';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { LayoutRoutes } from './LayoutRoutes';
import { LayoutSider } from './LayoutSider';
import { ComposeEmail } from '@/components/ComposeEmail';
import { AppBodyInitializer } from './AppBodyInitializer';

const { Content } = Layout;

export const LayoutContainer = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [composeEmailOpened, setComposeEmailOpened] = useState(false);

  return (
    <AppBodyInitializer>
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
    </AppBodyInitializer>
  );
};
