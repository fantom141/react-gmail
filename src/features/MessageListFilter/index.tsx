import React, { useRef } from 'react';
import styles from './styles.module.scss';
import { Controller } from 'react-hook-form';
import { FormItem } from '@/components/Form/FormItem';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ContentBlock } from '@/components/ContentBlock';
import { MessageListFilterProps } from './types';
import { Settings } from './Settings';

export const MessageListFilter = ({ control, onHandleSubmit, children, resetFn }: MessageListFilterProps) => {
  const formRef = useRef<HTMLFormElement>();

  const applySettings = () => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  const reset = () => {
    resetFn();
    applySettings();
  };

  const suffix = !children ? null : (
    <Settings
      onApply={applySettings}
      onReset={reset}
    >
      {children}
    </Settings>
  );

  return (
    <ContentBlock
      skipVerticalIndent={true}
      transparent={true}
      className={styles.root}
    >
      <form
        onSubmit={onHandleSubmit}
        autoComplete="none"
        ref={formRef}
      >
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <FormItem help={!field.value && 'Press «Enter» to apply search'}>
              <Input
                {...field}
                suffix={suffix}
                prefix={<SearchOutlined />}
                allowClear
                placeholder="Search"
              />
            </FormItem>
          )}
        />
      </form>
    </ContentBlock>
  );
};
