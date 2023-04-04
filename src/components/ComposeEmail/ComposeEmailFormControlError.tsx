import { theme, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { FieldError } from 'react-hook-form';

const { useToken } = theme;

export const ComposeEmailFormControlError = ({ message }: Required<Pick<FieldError, 'message'>>) => {
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
