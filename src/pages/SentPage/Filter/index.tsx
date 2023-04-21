import { useForm } from 'react-hook-form';
import { FilterProps, SentFilterValues } from './types';
import React, { useRef } from 'react';
import { MessageListFilter } from '@/features/MessageListFilter';
import { prepareFilterValuesToOutput } from './utils';
import { Button, Popover } from 'antd';
import { Settings } from './Settings';
import { ControlOutlined } from '@ant-design/icons';

export const Filter = ({ onChange }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<SentFilterValues>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (val: SentFilterValues) => onChange(prepareFilterValuesToOutput(val));
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
