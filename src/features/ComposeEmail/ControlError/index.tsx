import { theme, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { ControlErrorProps } from './types';

const { useToken } = theme;

export const ControlError = ({ message }: ControlErrorProps) => {
  const {
    token: { colorError },
  } = useToken();

  return (
    <Tooltip
      title={message}
      color={colorError}
    >
      <ExclamationCircleOutlined style={{ color: colorError }} />
    </Tooltip>
  );
};
