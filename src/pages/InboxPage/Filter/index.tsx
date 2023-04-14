import { Button, Popover } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { FilterProps, InboxFilterValues } from './types';
import React, { useRef } from 'react';
import { FilterSettings } from './FilterSettings';
import { PageFilter } from '@/features/PageFilter';
import { prepareFilterValuesToOutput } from './utils';

export const Filter = ({ change }: FilterProps) => {
  const { control, handleSubmit, reset } = useForm<InboxFilterValues>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (val: InboxFilterValues) => change(prepareFilterValuesToOutput(val));
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
        <FilterSettings
          control={control}
          reset={resetForm}
          apply={applySettings}
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
    <PageFilter
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
      suffix={settings}
      ref={formRef}
    />
  );
};
