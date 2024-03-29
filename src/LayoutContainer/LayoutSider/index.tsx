import styles from './styles.module.scss';
import { Button, Layout, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { UserInfo } from '../UserInfo';
import { SiderMenu } from '../SiderMenu';
import React from 'react';
import { LayoutSiderProps } from './types';

const { Sider } = Layout;

export const LayoutSider = ({ collapsed, onCollapsedChange, onCompose }: LayoutSiderProps) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth="48"
      width="280"
      theme="light"
      className={styles.root}
    >
      <div className={`${styles.content} ${collapsed ? styles.collapsed : ''}`}>
        <Button
          size="small"
          type="text"
          icon={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
          onClick={() => onCollapsedChange()}
          className={styles.toggler}
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
            onClick={() => onCompose()}
          >
            {!collapsed ? 'Compose' : ''}
          </Button>

          <SiderMenu collapsed={collapsed} />
        </Space>
      </div>
    </Sider>
  );
};
