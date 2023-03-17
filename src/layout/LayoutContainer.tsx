import './styles.scss';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { LayoutRoutes } from './LayoutRoutes';
import { LayoutSider } from './sider/LayoutSider';
import { ComposeEmail, ComposeEmailFormData } from '@/components/compose-email';

const { Content } = Layout;

export const LayoutContainer = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [composeEmailOpened, setComposeEmailOpened] = useState(false);

  const send = (data: ComposeEmailFormData) => {
    console.log(data);
  }

  return (
    <Layout hasSider>
      <LayoutSider
        collapsed={siderCollapsed}
        collapsedChange={() => setSiderCollapsed(!siderCollapsed)}
        compose={() => setComposeEmailOpened(true)}
      />

      <Layout className={siderCollapsed ? 'layout-container--collapsed' : 'layout-container--expanded'}>
        <Content className="layout-container__content">
          <LayoutRoutes />
        </Content>

        {composeEmailOpened && (
          <ComposeEmail
            className="layout-container__compose-email"
            close={() => setComposeEmailOpened(false)}
            send={send}
          />
        )}
      </Layout>
    </Layout>
  );
};
