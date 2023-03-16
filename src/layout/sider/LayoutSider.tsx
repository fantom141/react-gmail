import './styles.scss';
import { Button, Layout, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { UserInfo } from './UserInfo';
import { SiderMenu } from './SiderMenu';
import React from 'react';

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  collapsedChange: () => void;
  compose: () => void;
}

export const LayoutSider = ({ collapsed, collapsedChange, compose }: Props) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth="48"
      width="280"
      theme="light"
      className="layout-sider"
    >
      <div className={`layout-sider__content ${collapsed ? 'collapsed' : ''}`}>
        <Button
          size="small"
          type="text"
          icon={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
          onClick={() => collapsedChange()}
          className="layout-sider__toggler"
        />

        <Space
          direction="vertical"
          size="middle"
          style={{ width: '100%' }}
        >
          <UserInfo collapsed={collapsed} />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => compose()}
          >
            {!collapsed ? 'Compose' : ''}
          </Button>

          <SiderMenu />
        </Space>
      </div>
    </Sider>
  );
};
