import React, { forwardRef, Ref } from 'react';
import styles from './styles.module.scss';
import { Controller } from 'react-hook-form';
import { FormItem } from '@/components/FormItem';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ContentBlock } from '@/components/ContentBlock';
import { MessageListFilterProps } from './types';

export const MessageListFilter = forwardRef(({ control, onHandleSubmit, suffix }: MessageListFilterProps, ref: Ref<HTMLFormElement>) => {
  return (
    <ContentBlock
      skipVerticalIndent={true}
      transparent={true}
      className={styles.root}
    >
      <form
        onSubmit={onHandleSubmit}
        autoComplete="none"
        ref={ref}
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
});
