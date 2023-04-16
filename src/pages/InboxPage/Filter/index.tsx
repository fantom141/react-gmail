import { Button, Popover } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { FilterProps, InboxFilterValues } from './types';
import React, { useRef } from 'react';
import { Settings } from './Settings';
import { MessageListFilter } from '@/features/MessageListFilter';
import { prepareFilterValuesToOutput } from './utils';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<InboxFilterValues>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (val: InboxFilterValues) => onChange(prepareFilterValuesToOutput(val));
  const applySettings = () => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  const resetForm = () => {
    reset();
    applySettings();
  };

  const settings = (
    <Popover
      placement="bottomRight"
      trigger="click"
      content={
        <Settings
          control={control}
          onReset={resetForm}
          onApply={applySettings}
        />
      }
    >
      <Button
        type="text"
        size="middle"
        htmlType="button"
        icon={<ControlOutlined />}
      ></Button>
    </Popover>
  );

  return (
    <MessageListFilter
      control={control}
      onHandleSubmit={handleSubmit(onSubmit)}
      suffix={settings}
      ref={formRef}
    />
  );
};
