import { Button, DatePicker, Input, Row, Space } from 'antd';
import { Controller } from 'react-hook-form';
import React, { useEffect } from 'react';
import { FormItem } from '@/components/FormItem';
import { FilterSettingsProps } from './types';

const { RangePicker } = DatePicker;

export const FilterSettings = ({ control, apply, reset }: FilterSettingsProps) => {
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

  return (
    <div style={{ minWidth: '25rem' }}>
      <Controller
        name="senderEmail"
        control={control}
        render={({ field }) => (
          <FormItem label="Sender Email">
            <Input
              {...field}
              allowClear
              placeholder="example@provider.domain"
            />
          </FormItem>
        )}
      />

      <Controller
        name="dateReceived"
        control={control}
        render={({ field }) => (
          <FormItem label="Date Received">
            <RangePicker
              {...field}
              allowEmpty={[true, true]}
              allowClear
              inputReadOnly
              placeholder={['From', 'To']}
            />
          </FormItem>
        )}
      />

      <Row justify="end">
        <Space>
          <Button
            type="text"
            size="middle"
            htmlType="button"
            onClick={reset}
          >
            Reset
          </Button>

          <Button
            type="primary"
            size="middle"
            htmlType="button"
            onClick={apply}
          >
            Apply
          </Button>
        </Space>
      </Row>
    </div>
  );
};
