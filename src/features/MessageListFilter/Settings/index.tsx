import { Button, Popover, Row, Space } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { SettingsProps } from './types';

export const Settings = ({ children, onApply, onReset }: SettingsProps) => {
  // prevent close popover after date selection
  useEffect(() => {
    const handleClick = (event: Event) => {
      if ((event.target as HTMLElement).closest('.ant-picker-range-wrapper')) {
        event.stopImmediatePropagation();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const popoverContent = (
    <div style={{ minWidth: '25rem' }}>
      {children}

      <Row justify="end">
        <Space>
          <Button
            type="text"
            size="middle"
            htmlType="button"
            onClick={onReset}
          >
            Reset
          </Button>

          <Button
            type="primary"
            size="middle"
            htmlType="button"
            onClick={onApply}
          >
            Apply
          </Button>
        </Space>
      </Row>
    </div>
  );

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      content={popoverContent}
    >
      <Button
        type="text"
        size="middle"
        htmlType="button"
        icon={<ControlOutlined />}
      ></Button>
    </Popover>
  );
};
